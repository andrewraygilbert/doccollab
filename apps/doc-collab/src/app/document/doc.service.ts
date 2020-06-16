import { Injectable } from '@angular/core';
import { CoreSocketService } from '../socket/core-socket.service';
import { Observable, fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';
import { ActiveDocDto, DeltaDto } from '@doccollab/api-interfaces';

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

  public receiveDocFromDb$(): Observable<any> {
    return fromEvent(this.coreSocket.socket.on(), 'res.document');
  }

  public sendActiveDoc$(): Observable<any> {
    return fromEvent(this.coreSocket.socket.on(), 'get.document.active');
  }

  public sendActiveDoc(activeDoc: ActiveDocDto): void {
    this.coreSocket.socket.emit('send.document.active', activeDoc);
  }

  public sendDelta(delta: DeltaDto) {
    this.coreSocket.socket.emit('out.edit.doc', delta)
  }

  public leaveRoom() {
    this.coreSocket.socket.emit('leave.room');
  }

  public receiveDelta$(): Observable<any> {
    return fromEvent(this.coreSocket.socket.on(), 'in.edit.doc');
  }

  public receiveActiveDoc$(): Observable<any> {
    const activeDoc = fromEvent(this.coreSocket.socket.on(), 'send.document.active');
    return activeDoc.pipe(first());
  }

  public newActiveCollab$(): Observable<any> {
    return fromEvent(this.coreSocket.socket.on(), 'new.active.collab');
  }

  public removeActiveCollab$(): Observable<any> {
    return fromEvent(this.coreSocket.socket.on(), 'remove.active.collab');
  }

}
