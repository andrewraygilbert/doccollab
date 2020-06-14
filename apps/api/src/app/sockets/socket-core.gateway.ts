import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { RedisCoreService } from '../redis/redis-core/redis-core.service';

@Injectable()
@WebSocketGateway({"pingTimeout" : 30000})
export class SocketCoreGateway implements OnGatewayConnection, OnGatewayDisconnect {

  private connectedSockets = 0;

  constructor(
    private redis: RedisCoreService,
  ) {}

  // called when a new socket connects
  public handleConnection(@ConnectedSocket() socket: Socket) {
    this.connectedSockets++;
    this.redis.linkUserToSocket(socket);
    console.log(`*** SOCKET CONNECTED [${socket.id}] ***`);
    socket.on('disconnecting', (reason) => this.gracefulDisconnect(socket));
  }

  // called when a socket disconnects
  public handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.connectedSockets--;
    console.log(`~~~ SOCKET DISCONNECTED [${this.connectedSockets}] ~~~`);
  }


  /**
   * HELPERS
   */

  private gracefulDisconnect(socket: Socket) {
    console.log('gracefully disconnecting', socket.id);
    if (Object.keys(socket.rooms)[1]) {
      const roomId = Object.keys(socket.rooms)[1];
      this.redis.leaveRoom(roomId, socket.id);
      console.log('user gracefully disconnecting from room', socket.id);
      socket.broadcast.to(roomId).emit('remove.active.collab', { 'socketId': socket.id });
    }
    this.redis.unlinkUserFromSocket(socket);
  }

}
