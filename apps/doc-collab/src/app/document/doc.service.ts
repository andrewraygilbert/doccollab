import { Injectable } from '@angular/core';
import { CoreSocketService } from '../socket/core-socket.service';
import { Observable, fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  constructor(
    private coreSocket: CoreSocketService,
  ) { }

  public reqDocument(docId: string) {
    const body = {
      _id: docId
    };
    this.coreSocket.socket.emit('req.document', body);
  }

  public saveDocument(dto: any) {
    this.coreSocket.socket.emit('save.document.req', dto);
  }

  public resDocument$(): Observable<any> {
    return fromEvent(this.coreSocket.socket.on(), 'res.document');
  }

  public getActiveDoc$(): Observable<any> {
    return fromEvent(this.coreSocket.socket.on(), 'get.document.active');
  }

  public sendActiveDoc(activeDoc: any): void {
    this.coreSocket.socket.emit('send.document.active', activeDoc);
  }

  public outEditDoc(delta: any) {
    this.coreSocket.socket.emit('out.edit.doc', delta)
  }

  public leaveRoom() {
    this.coreSocket.socket.emit('leave.room');
  }

  public inEditDoc$(): Observable<any> {
    return fromEvent(this.coreSocket.socket.on(), 'in.edit.doc');
  }

  public receiveActiveDoc$(): Observable<any> {
    const activeDoc = fromEvent(this.coreSocket.socket.on(), 'send.document.active');
    return activeDoc.pipe(first());
  }

}
