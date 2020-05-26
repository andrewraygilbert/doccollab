import { Injectable } from '@angular/core';
import { CoreSocketService } from './../socket/core-socket.service';
import { CreateDocDto, AddCollabDto } from '@doccollab/api-interfaces';
import { Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private coreSocket: CoreSocketService,
  ) {}

  /**
   * EVENTS TO SERVER
   */

  public createDoc(createDocDto: CreateDocDto): void {
    this.coreSocket.socket.emit('create.document', createDocDto);
  }

  public getDocuments(): void {
    this.coreSocket.socket.emit('get.documents');
  }

  public addCollaborator(dto: AddCollabDto): void {
    console.log('sending add');
    this.coreSocket.socket.emit('add.collaborator.req', dto);
  }

  /**
   * EVENTS FROM SERVER
   */

  public newDocument$(): Observable<any> {
    return fromEvent(this.coreSocket.socket.on(), 'new.document');
  }

  public returnDocuments$(): Observable<any> {
    return fromEvent(this.coreSocket.socket.on(), 'return.documents');
  }

  public addCollabRes$(): Observable<any> {
    return fromEvent(this.coreSocket.socket.on(), 'add.collaborator.res');
  }

}
