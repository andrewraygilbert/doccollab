import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocService } from '../doc.service';
import { Subscription } from 'rxjs';
import { CoreSocketService } from '../../socket/core-socket.service';

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

  constructor(
    private route: ActivatedRoute,
    private docService: DocService,
    private coreSocket: CoreSocketService,
  ) { }

  private reqDocument(docId: string) {
    this.docService.reqDocument(docId);
  }

  public contentChange(data: any) {
    console.log(data.delta);
    this.docService.outEditDoc(data.delta);
  }

  private handleDeltaIn(delta: any) {
    const firstOp = delta.ops[0];
    let secondOp: any;
    if (delta.ops[1]) {
      secondOp = delta.ops[1];
    }
    let index = 0;
    if (Object.keys(firstOp)[0] === 'retain') {
      index = firstOp.retain;
    }
    if (Object.keys(firstOp)[0] === 'insert' || (secondOp && Object.keys(secondOp)[0] === 'insert')) {
      this.insertText(index, firstOp.insert ? firstOp.insert : secondOp.insert);
    }
    if (Object.keys(firstOp)[0] === 'delete' || (secondOp && Object.keys(secondOp)[0] === 'delete')) {
      this.deleteText(index, firstOp.delete ? firstOp.delete : secondOp.delete);
    }
  }

  private insertText(index: number, text: string) {
    this.editorInstance.insertText(index, text, 'silent');
  }

  private deleteText(index: number, numRemove: number) {
    this.editorInstance.deleteText(index, numRemove, 'silent');
  }

  private initializeSubscriptions() {
    this.resDocument$ = this.docService.resDocument$()
      .subscribe(doc => {
        this.activeDocument = doc;
      });
    this.inEditDoc$ = this.docService.inEditDoc$()
      .subscribe(delta => {
        console.log(delta);
        this.handleDeltaIn(delta);
      });
  }

  public testInserting() {
    this.editorInstance.insertText(0, 'Hello my friend', 'user');
  }

  ngOnInit(): void {
    if (!this.coreSocket.socket) {
      this.coreSocket.initializeSocket();
    }
    this.route.params.subscribe(params => {
      this.documentId = params['docId'];
      this.reqDocument(this.documentId);
    });
    this.initializeSubscriptions();
  }

  ngOnDestroy(): void {
    this.resDocument$.unsubscribe();
    this.inEditDoc$.unsubscribe();
  }

}
