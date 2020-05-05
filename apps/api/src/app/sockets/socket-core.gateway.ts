import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
@WebSocketGateway({"pingTimeout" : 30000})
export class SocketCoreGateway implements OnGatewayConnection, OnGatewayDisconnect {

  // called when a new socket connects
  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log('a socket connected');
  }

  // called when a socket disconnects
  handleDisconnect() {
    console.log('a socket disconnected');
  }
}
