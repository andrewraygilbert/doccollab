import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocService } from '../doc.service';
import { Subscription } from 'rxjs';
import { CoreSocketService } from '../../socket/core-socket.service';
import { DeltaService } from '../../delta/delta.service';
import { DeltaDto } from '@doccollab/api-interfaces';
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
  public collabDoc: boolean;
  public collabReady: boolean = false;
  private dbDoc: any;
  private collabTimeout: any;
  public disconnected: boolean;
  public userInfo: any;

  // SUBSCRIPTIONS
  private resDocument$: Subscription;
  private inEditDoc$: Subscription;
  private getActiveDoc$: Subscription;
  private sendActiveDoc$: Subscription;
  private disconnection$: Subscription;
  private reconnection$: Subscription;

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
    this.docService.outEditDoc(deltaOut);
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
   * COLLABORATION FEATURES
   */

  // handle the incoming delta; check to see if ready to reconcile
  private readyForReconcile(delta: DeltaDto) {
    if (this.collabReady) {
      if (this.deltaService.reconciliable(delta)) {
        console.log('READY -> processing this delta', delta);
        this.processDelta(delta);
      } else { // delta cannot be reconciled yet
        console.log('NOT READY -> cannot reconcile yet', delta);
        setTimeout(() => {
          console.log('RETRYING -> retry queued delta', delta);
          this.readyForReconcile(delta)
        }, 1000);
      }
    } else {
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

  // send out active document
  private sendActiveDoc(req: any) {
    const activeDoc = {
      content: this.editorInstance.getContents(),
      incomingRecord: this.deltaService.getIncomingRecord(),
      outgoingRecord: this.deltaService.getOutgoingRecord(),
      fromSocketId: this.deltaService.getSocketId(),
      toSocketId: req.socketId
    };
    console.log('outgoing activeDoc', activeDoc);
    this.docService.sendActiveDoc(activeDoc);
  }

  private receiveActiveDoc(activeDoc: any) {
    console.log('receiving activeDoc', activeDoc);
    if (this.collabTimeout) {
      this.clearCollabTimeout();
    }
    if (this.editorInstance) {
      this.deltaService.setIncomingRecord(activeDoc);
      this.editorInstance.setContents(activeDoc.content, 'silent');
      this.activeDocument = this.dbDoc;
      this.collabReady = true;
    } else {
      console.log('editor instance not ready yet');
      setTimeout(() => this.receiveActiveDoc(activeDoc), 250);
    }
  }

  private receiveActiveDocReconnect(activeDoc: any) {
    console.log('receiving from reconnect');
    if (this.collabTimeout) {
      this.clearCollabTimeout();
    }
    if (this.editorInstance) {
      this.deltaService.setIncomingRecord(activeDoc);
      this.editorInstance.setContents(activeDoc.content, 'silent');
      this.activeDocument = this.dbDoc;
      this.collabReady = true;
    } else {
      console.log('editor instance not ready yet');
      setTimeout(() => this.receiveActiveDoc(activeDoc), 250);
    }
  }

  private handleDocIn(res: any) {
    this.collabDoc = res.collab;
    if (res.collab) {
      console.log('COLLABORATION -> setting timer to receive doc - INITIAL');
      this.dbDoc = res.document;
      this.startCollabTimeout();
    } else {
      console.log('NO COLLABORATION -> setting doc from db - INITIAL');
      this.editorContent = res.document.content;
      this.activeDocument = res.document;
    }
  }

  // sets the editor content after a reconnect event
  private handleDocOnReconnect(res: any) {
    console.log('handleDocRec res', res);
    if (res.collab) {
      console.log('COLLABORATION -> setting timer to receive doc - RECONNECT');
      this.dbDoc = res.document;
      this.startCollabReconnectTimeout();
    }
  }

  private useDbDoc() {
    console.log('NO COLLAB DOC -> using db doc bc no active doc received');
    this.activeDocument = this.dbDoc;
    this.editorContent = this.dbDoc.content;
    this.collabReady = true;
  }

  private useLastContent() {
    console.log('using the last active content');
    this.collabReady = true;
  }

  private startCollabTimeout() {
    this.collabTimeout = setTimeout(() => this.useDbDoc(), 5000);
  }

  private startCollabReconnectTimeout() {
    this.collabTimeout = setTimeout(() => this.useLastContent(), 5000);
  }

  private clearCollabTimeout() {
    clearTimeout(this.collabTimeout);
  }

  private onDisconnection() {
    this.disconnected = true;
  }

  private onReconnection() {
    if (this.activeDocument.collaborators.length > 0) {
      this.collabReady = false;
      this.disconnected = false;
      if (this.getActiveDoc$) {
        console.log('unsubscribing from getActiveDoc');
        this.getActiveDoc$.unsubscribe();
      }
      if (this.sendActiveDoc$) {
        console.log('unsubscribing from sendActiveDoc');
        this.sendActiveDoc$.unsubscribe();
      }
      this.sendActiveDoc$ = this.docService.receiveActiveDoc$()
        .subscribe(res => {
          this.receiveActiveDocReconnect(res);
        })
      this.getActiveDoc$ = this.docService.getActiveDoc$()
        .subscribe(res => {
          this.handleDocOnReconnect(res);
        });
    }
    this.reqDocument(this.documentId);
  }

  /**
   * INITIALIZATION HELPERS
   */

  // subscribe to socket event observables
  private initializeSubscriptions() {
    console.log('re-initializing?');
    this.resDocument$ = this.docService.resDocument$()
      .subscribe(res => {
        console.log('in original resDoc sub');
        this.handleDocIn(res);
      });
    this.getActiveDoc$ = this.docService.getActiveDoc$()
      .subscribe((req) => {
        this.sendActiveDoc(req);
      });
    this.sendActiveDoc$ = this.docService.receiveActiveDoc$()
      .subscribe((activeDoc) => {
        this.receiveActiveDoc(activeDoc);
      });
    this.inEditDoc$ = this.docService.inEditDoc$()
      .subscribe(delta => {
        console.log('INCOMING DELTA', delta);
        this.readyForReconcile(delta);
      });
    this.disconnection$ = this.coreSocket.onDisconnect()
      .subscribe(event => {
        console.log('disconnection');
        this.onDisconnection();
      })
    this.reconnection$ = this.coreSocket.onReconnect()
      .subscribe(event => {
        console.log('reconnection');
        this.onReconnection();
      })
  }

  private setSocketId() {
    this.deltaService.setSocketId(this.coreSocket.socket.id);
    this.socketId = this.coreSocket.socket.id;
  }

  private reqDocument(docId: string) {
    this.docService.reqDocument(docId);
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
    this.resDocument$.unsubscribe();
    this.inEditDoc$.unsubscribe();
    this.getActiveDoc$.unsubscribe();
    this.deltaService.resetAllDeltas();
    this.deltaService.stopPurging();
  }

}
