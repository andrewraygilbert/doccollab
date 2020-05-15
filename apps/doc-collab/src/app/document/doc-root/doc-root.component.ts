import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocService } from '../doc.service';
import { Subscription } from 'rxjs';
import { CoreSocketService } from '../../socket/core-socket.service';
import { DeltaService } from '../../delta/delta.service';
import { DeltaDto } from '@doccollab/api-interfaces';

@Component({
  selector: 'doccollab-doc-root',
  templateUrl: './doc-root.component.html',
  styleUrls: ['./doc-root.component.css']
})
export class DocRootComponent implements OnInit, OnDestroy {

  public editorContent: any;
  public documentId: string;
  public activeDocument: any;
  private resDocument$: Subscription;
  private inEditDoc$: Subscription;
  public editorInstance: any;
  private socketId: string;

  constructor(
    private route: ActivatedRoute,
    private docService: DocService,
    private coreSocket: CoreSocketService,
    private deltaService: DeltaService,
  ) { }

  private reqDocument(docId: string) {
    this.docService.reqDocument(docId);
  }

  public contentChange(data: any) {
    const deltaOut = this.deltaService.outgoingDelta(data.delta);
    console.log('deltaOut', deltaOut);
    this.docService.outEditDoc(deltaOut);
  }

  private handleDeltaIn(delta: DeltaDto) {
    console.log('deltaIn', delta);
    const procDelta = this.deltaService.incomingDelta(delta);
    const firstOp = procDelta.ops[0];
    let secondOp: any;
    if (procDelta.ops[1]) {
      secondOp = procDelta.ops[1];
    }
    let index = 0;
    if (Object.keys(firstOp)[0] === 'retain') {
      index = firstOp.retain;
    }
    if (Object.keys(firstOp)[0] === 'insert' || (secondOp && Object.keys(secondOp)[0] === 'insert')) {
      if (firstOp.attributes || (secondOp && secondOp.attributes)) {
        this.insertText(index, firstOp.insert ? firstOp.insert : secondOp.insert, firstOp.attributes ? firstOp.attributes : secondOp.attributes);
      } else {
        this.insertText(index, firstOp.insert ? firstOp.insert : secondOp.insert, {bold: false, italic: false, underline: false, strike: false});
      }
    }
    if (Object.keys(firstOp)[0] === 'delete' || (secondOp && Object.keys(secondOp)[0] === 'delete')) {
      this.deleteText(index, firstOp.delete ? firstOp.delete : secondOp.delete);
    }
    if (secondOp && Object.keys(secondOp)[0] === 'retain') {
      if (Object.keys(secondOp)[1] === 'attributes') {
        this.formatText(index, secondOp.retain, secondOp.attributes);
      }
    }
    if (procDelta.ops[2]) {
      const thirdOp = procDelta.ops[2];
      if (Object.keys(thirdOp)[0] === 'retain') {
        this.formatText(index + secondOp.insert.length, thirdOp.retain, thirdOp.attributes);
      }
    }
  }

  private insertText(index: number, text: string, attributes?: any) {
    if (attributes) {
      this.editorInstance.insertText(index, text, attributes, 'silent');
    } else {
      this.editorInstance.insertText(index, text, 'silent');
    }
  }

  private deleteText(index: number, numRemove: number) {
    this.editorInstance.deleteText(index, numRemove, 'silent');
  }

  private formatText(index: number, length: number, attributes: any) {
    this.editorInstance.formatText(index, length, attributes, 'silent');
  }

  // subscribe to socket event observables
  private initializeSubscriptions() {
    this.resDocument$ = this.docService.resDocument$()
      .subscribe(doc => {
        this.activeDocument = doc;
      });
    this.inEditDoc$ = this.docService.inEditDoc$()
      .subscribe(delta => {
        this.handleDeltaIn(delta);
      });
  }

  public testInserting() {
    this.editorInstance.insertText(0, 'Hello my friend', 'user');
  }

  private setSocketId() {
    this.deltaService.setSocketId(this.coreSocket.socket.id);
    this.socketId = this.coreSocket.socket.id;
  }

  ngOnInit(): void {
    // Initialize a socket if none exists
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
  }

  ngOnDestroy(): void {
    this.resDocument$.unsubscribe();
    this.inEditDoc$.unsubscribe();
    this.deltaService.resetAllDeltas();
  }

}
