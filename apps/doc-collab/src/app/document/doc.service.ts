import { Injectable } from '@angular/core';
import { CoreSocketService } from '../socket/core-socket.service';
import { Observable, fromEvent } from 'rxjs';

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

  public resDocument$(): Observable<any> {
    return fromEvent(this.coreSocket.socket.on(), 'res.document');
  }

  public outEditDoc(delta: any) {
    this.coreSocket.socket.emit('out.edit.doc', delta)
  }

  public inEditDoc$(): Observable<any> {
    return fromEvent(this.coreSocket.socket.on(), 'in.edit.doc');
  }

}
