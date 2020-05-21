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

  /**
   * GENERAL FUNCTIONS
   */

  // send out local changes in the editor
  public contentChange(data: any) {
    const deltaOut = this.deltaService.processDeltaOut(data.delta);
    this.docService.outEditDoc(deltaOut);
  }

  /**
   * COLLABORATION FEATURES
   */

  // handle the incoming delta; check to see if ready to reconcile
  private readyForReconcile(delta: DeltaDto) {
    if (delta.localRecord.length === 0) { // delta has no local record -> ready to reconcile
      this.processDelta(delta);
    } else { // delta has a local record
      if (this.deltaService.canReconcileDelta(delta)) {
        this.processDelta(delta);
      } else {
        console.log('not ready yet');
        setTimeout(() => this.readyForReconcile(delta), 1000); // delta is not ready -> wait and try again
      }
    }
  }

  // incorporate the delta into the editor
  private processDelta(delta: DeltaDto) {
    const reconciledDelta = this.deltaService.processDelta(delta); // obtain a reconciled delta
    console.log('reconciled delta', reconciledDelta);
    let baseIndex = 0;
    for (const op of reconciledDelta.ops) { // process each operation of the delta
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

  /**
   * INITIALIZATION HELPERS
   */

  // subscribe to socket event observables
  private initializeSubscriptions() {
    this.resDocument$ = this.docService.resDocument$()
      .subscribe(doc => {
        this.activeDocument = doc;
      });
    this.inEditDoc$ = this.docService.inEditDoc$()
      .subscribe(delta => {
        console.log('INCOMING DELTA', delta);
        this.readyForReconcile(delta);
      });
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
