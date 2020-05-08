import { Injectable } from '@angular/core';
import { CoreSocketService } from './../socket/core-socket.service';
import { AppDocBase, CreateDocDto } from '@doccollab/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private socket: any;

  constructor(
    private coreSocket: CoreSocketService,
  ) {}

  public sendTest() {
    this.coreSocket.socket.emit('testing', {'msg' : 'here it is'});
  }

  public createDoc(createDocDto: CreateDocDto) {
    this.coreSocket.socket.emit('create.document', createDocDto);
  }

}
