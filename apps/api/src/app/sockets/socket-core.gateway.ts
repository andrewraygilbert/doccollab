import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { Injectable, UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsGuard } from '../auth/ws.guard';

@Injectable()
@WebSocketGateway({"pingTimeout" : 30000})
export class SocketCoreGateway implements OnGatewayConnection, OnGatewayDisconnect {

  private connectedSockets = 0;
  // called when a new socket connects
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.connectedSockets++;
    console.log(`*** SOCKET CONNECTED [${this.connectedSockets}] ***`);
  }

  // called when a socket disconnects
  handleDisconnect() {
    this.connectedSockets--;
    console.log(`~~~ SOCKET DISCONNECTED [${this.connectedSockets}] ~~~`);
  }
}
