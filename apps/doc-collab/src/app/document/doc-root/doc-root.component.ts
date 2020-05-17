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

  private nullAttributes = {
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    script: null,
    blockquote: false,
    'code-block': false,
  }

  constructor(
    private route: ActivatedRoute,
    private docService: DocService,
    private coreSocket: CoreSocketService,
    private deltaService: DeltaService,
  ) { }

  private reqDocument(docId: string) {
    this.docService.reqDocument(docId);
  }

  // send out local changes in the editor
  public contentChange(data: any) {
    const deltaOut = this.deltaService.outgoingDelta(data.delta);
    console.log('deltaOut', deltaOut);
    this.docService.outEditDoc(deltaOut);
  }

  // process an incoming delta
  private handleDeltaIn(delta: DeltaDto) {
    // reconcile the incoming delta
    const reconciledDelta = this.deltaService.incomingDelta(delta);
    let baseIndex = 0;
    // iterate through each delta operation
    for (const op of reconciledDelta.ops) {
      // handle delta based on the type of change it performs
      switch (Object.keys(op)[0]) {
        case 'insert':
          this.insertText(baseIndex, op.insert, op.attributes ? op.attributes : this.nullAttributes);
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
