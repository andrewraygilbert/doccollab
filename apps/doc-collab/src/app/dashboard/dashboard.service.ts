import { Injectable } from '@angular/core';
import { CoreSocketService } from './../socket/core-socket.service';

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

}
