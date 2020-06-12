import { Injectable } from '@nestjs/common';
import * as redis from 'redis';
import { environment } from './../../../environments/environment';
import { WsAuth } from '../../auth/ws.auth';
import { Socket } from 'socket.io';

@Injectable()
export class RedisCoreService {

  private client: redis.RedisClient;

  constructor(
    private wsAuth: WsAuth,
  ) {
    this.client = redis.createClient(environment.REDIS_URI);
  }

  public async linkUserToSocket(socket: Socket) {
    const userModel = await this.wsAuth.getUser(socket.handshake.query.token);
    this.client.hmset(`socket:${socket.id}`, [
      'userId', userModel._id.toString(),
      'username', userModel.username,
      'firstName', userModel.firstName,
      'lastName', userModel.lastName
    ]);
  }

  public async unlinkUserFromSocket(socket: Socket) {
    this.client.del(`socket:${socket.id}`);
  }

  public joinRoom(docId: string, socketId: string) {
    const docIdString = docId.toString();
    const added = this.client.sadd(docIdString, socketId);
    if (added) {
      console.log('was added');
    } else {
      console.log('was already there');
    }
  }

  public leaveRoom(docId: string, socketId: string) {
    const docIdString = docId.toString();
    const removed = this.client.srem(docIdString, socketId);
    if (removed) {
      console.log('was removed');
    } else {
      console.log('was not in set');
    }
  }

}
