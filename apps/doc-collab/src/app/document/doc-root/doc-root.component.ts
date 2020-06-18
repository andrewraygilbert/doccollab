import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocService } from '../doc.service';
import { Subscription } from 'rxjs';
import { CoreSocketService } from '../../socket/core-socket.service';
import { DeltaService } from '../../delta/delta.service';
import { DeltaDto, ActiveDocDto, DocOutDto, RedisUser } from '@doccollab/api-interfaces';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'doccollab-doc-root',
  templateUrl: './doc-root.component.html',
  styleUrls: ['./doc-root.component.css']
})
export class DocRootComponent implements OnInit, OnDestroy {

  public editorContent: any;
  public documentId: string;
  public activeDocument: any;
  public editorInstance: any;
  private socketId: string;
  public isCollabDoc: boolean;
  public collabReady: boolean = false;
  private dbDoc: any;
  private collabTimeout: any;
  public disconnected: boolean;
  public userInfo: any;
  public activeUsers: any;
  private disconnectionTime: Date;

  public quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'indent': '+1'}, {'indent': '-1'}],
        [{'size': ['small', false, 'large', 'huge']}],
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        ['clean']
      ]
    }
  }

  // SUBSCRIPTIONS
  private receiveDocFromDb$: Subscription;
  private receiveDelta$: Subscription;
  private sendActiveDoc$: Subscription;
  private disconnection$: Subscription;
  private reconnection$: Subscription;
  private receiveActiveDoc$: Subscription;
  private newActiveCollab$: Subscription;
  private removeActiveCollab$: Subscription;

  private nullAttributes = {
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    script: null,
    blockquote: false,
    'code-block': false,
    header: null,
    list: null,
    indent: null,
    background: null,
    color: null,
    font: null,
    size: null,
    align: null,
  }

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private docService: DocService,
    private coreSocket: CoreSocketService,
    private deltaService: DeltaService,
  ) { }

  /**
   * GENERAL FUNCTIONS
   */

  // send out local changes in the editor
  public contentChange(data: any) {
    const deltaOut = this.deltaService.processDeltaOut(data.delta);
    this.docService.sendDelta(deltaOut);
  }

  public saveDocument() {
    const dto = {
      content: this.editorInstance.getContents(),
      docId: this.activeDocument._id
    };
    console.log('SAVING -> dto', dto);
    this.docService.saveDocument(dto);
  }

  public getUserInfo() {
    this.userInfo = this.authService.getUserInfo();
  }

  /**
   * DELTA MANAGEMENT
   *
   * Incoming deltas are processed in two stages: Stage 1 verifies that
   * the delta can be reconciled (i.e., the incoming delta's state can
   * be reconciled with the context socket's state). Stage 2 actually
   * reconciles the delta with the context socket's state to ensure that
   * changes are incorporated at the correct index positions.
   *
   */

  // handle the incoming delta; check to see if ready to reconcile
  private readyForReconcile(delta: DeltaDto) {
    if (this.collabReady) { // doc is ready for collaboration
      if (this.deltaService.reconciliable(delta)) { // delta can be reconciled
        console.log('READY -> processing this delta', delta);
        this.processDelta(delta);
      } else { // delta CANNOT be reconciled yet
        console.log('NOT READY -> cannot reconcile yet', delta);
        setTimeout(() => {
          console.log('RETRYING -> retry queued delta', delta);
          this.readyForReconcile(delta)
        }, 1000);
      }
    } else { // doc is NOT ready for collaboration
      console.log('NOT READY -> cannot reconcile delta yet');
      setTimeout(() => {
        console.log('RETRYING -> retry queued delta', delta);
        this.readyForReconcile(delta);
      }, 1000);
    }

  }

  // incorporate the delta into the editor
  private processDelta(delta: DeltaDto) {
    const reconciledDelta = this.deltaService.processDelta(delta); // obtain a reconciled delta
    if (reconciledDelta) {
      let baseIndex = 0;
      for (const op of reconciledDelta.ops) { // process each operation of the delta
        const attr = this.buildAttributes(op);
        switch (Object.keys(op)[0]) {
          case 'insert':
            this.insertText(baseIndex, op.insert, attr);
            baseIndex = baseIndex + op.insert.length;
            break;
          case 'delete':
            this.deleteText(baseIndex, op.delete);
            break;
          case 'retain':
            if (op.attributes) {
              this.formatText(baseIndex, op.retain, op.attributes);
              baseIndex = baseIndex + op.retain;
            }
            baseIndex = baseIndex + op.retain;
            break;
        }
      }
    }
  }

  // constructs the attributes of the delta
  private buildAttributes(op: any) {
    if (op.attributes) {
      return {
        bold: op.attributes.bold ? op.attributes.bold : false,
        italic: op.attributes.italic ? op.attributes.italic : false,
        underline: op.attributes.underline ? op.attributes.underline : false,
        strike: op.attributes.strike ? op.attributes.strike : false,
        script: op.attributes.script ? op.attributes.script : null,
        blockquote: op.attributes.blockquote ? op.attributes.blockquote : false,
        'code-block': op.attributes['code-block'] ? op.attributes['code-block'] : false,
        header: op.attributes.header ? op.attributes.header : null,
        list: op.attributes.list ? op.attributes.list : null,
        indent: op.attributes.indent ? op.attributes.indent : null,
        background: op.attributes.background ? op.attributes.background : null,
        color: op.attributes.color ? op.attributes.color : null,
        font: op.attributes.font ? op.attributes.font : null,
        size: op.attributes.size ? op.attributes.size : null,
        align: op.attributes.align ? op.attributes.align : null,
      }
    } else {
      return this.nullAttributes;
    }
  }

  // insert text into the editor
  private insertText(index: number, text: string, attributes?: any) {
    if (attributes) {
      this.editorInstance.insertText(index, text, attributes, 'silent');
    } else {
      this.editorInstance.insertText(index, text, 'silent');
    }
  }

  // delete text from the editor
  private deleteText(index: number, numRemove: number) {
    this.editorInstance.deleteText(index, numRemove, 'silent');
  }

  // format text in the editor
  private formatText(index: number, length: number, attributes: any) {
    this.editorInstance.formatText(index, length, attributes, 'silent');
  }

  /**
   * SHARE CURRENT STATE WITH NEW COLLAB
   */

  // send out active document
  private sendActiveDoc(req: {socketId: string}) {
    const activeDoc: ActiveDocDto = {
      content: this.editorInstance.getContents(),
      incomingRecord: this.deltaService.getIncomingRecord(),
      outgoingRecord: this.deltaService.getOutgoingRecord(),
      fromSocketId: this.deltaService.getSocketId(),
      toSocketId: req.socketId
    };
    console.log('outgoing activeDoc', activeDoc);
    this.docService.sendActiveDoc(activeDoc);
  }

  /**
   * INITIAL EDITOR SETUP
   */

  // request the document from the server
  private reqDocument(docId: string) {
    this.docService.reqDocument(docId);
  }

  // silently sets the content of the editor
  private setEditorContent(content: any) {
    if (this.editorInstance) {
      this.editorInstance.setContents(content, 'silent');
      this.collabReady = true;
    } else {
      console.log('editor instance not ready to receive doc');
      setTimeout(() => this.setEditorContent(content), 250);
    }
  }

  // receive doc from the database
  private handleDocFromDb(docDto: DocOutDto) {
    this.isCollabDoc = docDto.collab;
    if (docDto.collab) {
      console.log('COLLABORATION -> setting timer to receive doc - INITIAL');
      this.dbDoc = docDto.document;
      this.activeUsers = docDto.activeUsers;
      this.startCollabTimeout();
    } else {
      console.log('NO COLLABORATION -> setting doc from db - INITIAL');
      this.setEditorContent(docDto.document.content);
      this.activeDocument = docDto.document;
    }
  }

  // receive the active document from an active collaborator
  private receiveActiveDoc(activeDoc: ActiveDocDto) {
    console.log('receiving activeDoc', activeDoc);
    if (this.collabTimeout) {
      this.clearCollabTimeout();
    }
    this.deltaService.setIncomingRecord(activeDoc);
    this.activeDocument = this.dbDoc;
    this.setEditorContent(activeDoc.content);
  }

  // uses the doc from the database
  private useDbDoc() {
    console.log('NO COLLAB DOC -> using db doc bc no active doc received');
    this.activeDocument = this.dbDoc;
    this.setEditorContent(this.dbDoc.content);
  }

  private startCollabTimeout() {
    this.collabTimeout = setTimeout(() => this.useDbDoc(), 5000);
  }

  private clearCollabTimeout() {
    clearTimeout(this.collabTimeout);
  }

  /**
   * DISCONNECTIONS/RECONNECTIONS
   */

  // handle disconnection event
  private onDisconnection() {
    this.disconnected = true;
    this.disconnectionTime = new Date();
    this.clearConnectionSubs();
    console.log('disconnection time: ', this.disconnectionTime);
  }

  // handle reconnection to server sockets
  private onReconnection() {
    if (this.activeDocument.collaborators.length > 0) {
      this.disconnected = false;
      this.collabReady = false;
      this.setReconnectionSubs();
    }
    this.reqDocument(this.documentId);
  }

  // clear original doc subscriptions
  private clearConnectionSubs() {
    if (this.receiveDocFromDb$) {
      this.receiveDocFromDb$.unsubscribe();
    }
    if (this.receiveActiveDoc$) {
      this.receiveActiveDoc$.unsubscribe();
    }
  }

  // set reconnection doc subscriptions
  private setReconnectionSubs() {
    this.receiveActiveDoc$ = this.docService.receiveActiveDoc$()
      .subscribe(res => {
        this.receiveActiveDocReconnect(res);
    });
    this.receiveDocFromDb$ = this.docService.receiveDocFromDb$()
      .subscribe(res => {
        this.handleDocOnReconnect(res);
    });
  }

  private startCollabReconnectTimeout() {
    this.collabTimeout = setTimeout(() => this.compareTimestamps(), 5000);
  }

  // check to see whether saved collab doc is more recent than the disconnection event
  private compareTimestamps() {
    if (this.dbDoc.savedDate > this.disconnectionTime) {
      console.log('saved doc is more recent than last active content -> use DB doc');
      this.setEditorContent(this.dbDoc.content);
    }
    console.log('last active content is more recent than DB doc -> use last active');
    this.collabReady = true;
  }

  // receives doc from DB after reconnection event
  private handleDocOnReconnect(docDto: DocOutDto) {
    console.log('handleDocRec res', docDto);
    if (docDto.collab) {
      console.log('COLLABORATION -> setting timer to receive doc - RECONNECT');
      this.dbDoc = docDto.document;
      this.activeUsers = docDto.activeUsers;
      this.startCollabReconnectTimeout();
    }
  }

  // receives active doc from active collaborator
  private receiveActiveDocReconnect(activeDoc: ActiveDocDto) {
    console.log('receiving from reconnect');
    if (this.collabTimeout) {
      this.clearCollabTimeout();
    }
    this.deltaService.setIncomingRecord(activeDoc);
    this.activeDocument = this.dbDoc;
    this.setEditorContent(activeDoc.content);
  }

  /**
   * ACTIVE USER MANAGEMENT
   */

  // add an active collaborator
  private addActiveCollab(user: RedisUser) {
    const index = this.activeUsers.findIndex((user_i: any) => user_i.userId === user.userId);
    if (index === -1) {
      this.activeUsers.push(user);
    }
  }

  // remove an active collaborator
  private removeActiveCollab(socket: {socketId: string} ) {
    const index = this.activeUsers.findIndex((user_i: any) => user_i.socketId === socket.socketId);
    if (index !== -1) {
      this.activeUsers.splice(index, 1);
    }
  }

  /**
   * INITIALIZATION HELPERS
   */

  // subscribe to socket event observables
  private initializeSubscriptions() {
    this.receiveDocFromDb$ = this.docService.receiveDocFromDb$()
      .subscribe(res => {
        this.handleDocFromDb(res);
      });
    this.sendActiveDoc$ = this.docService.sendActiveDoc$()
      .subscribe((req) => {
        this.sendActiveDoc(req);
      });
    this.receiveActiveDoc$ = this.docService.receiveActiveDoc$()
      .subscribe((activeDoc) => {
        this.receiveActiveDoc(activeDoc);
      });
    this.receiveDelta$ = this.docService.receiveDelta$()
      .subscribe(delta => {
        console.log('INCOMING DELTA', delta);
        this.readyForReconcile(delta);
      });
    this.disconnection$ = this.coreSocket.onDisconnect()
      .subscribe(event => {
        console.log('disconnection');
        this.onDisconnection();
      });
    this.reconnection$ = this.coreSocket.onReconnect()
      .subscribe(event => {
        console.log('reconnection');
        this.onReconnection();
      });
    this.newActiveCollab$ = this.docService.newActiveCollab$()
      .subscribe(user => {
        console.log('new collaborator', user);
        this.addActiveCollab(user);
      });
    this.removeActiveCollab$ = this.docService.removeActiveCollab$()
      .subscribe(user => {
        console.log('remove collaborator', user);
        this.removeActiveCollab(user);
      });
  }

  private setSocketId() {
    this.deltaService.setSocketId(this.coreSocket.socket.id);
    this.socketId = this.coreSocket.socket.id;
  }

  /**
   * LIFECYCLE HOOKS
   */

  ngOnInit(): void {
    // Initialize a socket if none exists
    this.deltaService.activatePurging();
    if (!this.coreSocket.socket) {
      this.coreSocket.initializeSocket();
    }
    // retrieve document id from route parameters
    this.route.params.subscribe(params => {
      this.documentId = params['docId'];
      this.reqDocument(this.documentId);
    });
    // subscribe to socket event observables
    this.initializeSubscriptions();
    this.setSocketId();
    this.getUserInfo();
  }

  ngOnDestroy(): void {
    this.deltaService.resetAllDeltas();
    this.deltaService.stopPurging();
    this.docService.leaveRoom();
    this.receiveDocFromDb$.unsubscribe();
    this.receiveDelta$.unsubscribe();
    this.sendActiveDoc$.unsubscribe();
    this.newActiveCollab$.unsubscribe();
    this.removeActiveCollab$.unsubscribe();
    this.receiveActiveDoc$.unsubscribe();
    this.disconnection$.unsubscribe();
    this.reconnection$.unsubscribe();
  }

}
