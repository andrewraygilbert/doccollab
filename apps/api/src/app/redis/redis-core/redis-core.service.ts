import { Injectable } from '@nestjs/common';
import * as redis from 'redis';
import { environment } from './../../../environments/environment';
import { WsAuth } from '../../auth/ws.auth';
import { Socket } from 'socket.io';
import { promisify } from 'util';
import { WsException } from '@nestjs/websockets';

type redisFn = (key: string) => Promise<any>;

@Injectable()
export class RedisCoreService {

  private client: redis.RedisClient;
  private asyncSmembers: any;
  private asyncHgetall: any;

  constructor(
    private wsAuth: WsAuth,
  ) {
    this.client = redis.createClient(environment.REDIS_URI);
    this.asyncSmembers = promisify(this.client.smembers).bind(this.client) as redisFn;
    this.asyncHgetall = promisify(this.client.hgetall).bind(this.client) as redisFn;
  }

  public async linkUserToSocket(socket: Socket) {
    const userModel = await this.wsAuth.getUser(socket.handshake.query.token);
    this.client.hmset(`socket:${socket.id}`, [
      'socketId', socket.id,
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
    const added = this.client.sadd(`room:${docIdString}`, socketId);
    if (added) {
      console.log('was added');
    } else {
      console.log('was already there');
    }
  }

  public leaveRoom(docId: string, socketId: string) {
    const docIdString = docId.toString();
    const removed = this.client.srem(`room:${docIdString}`, socketId);
    if (removed) {
      console.log('was removed');
    } else {
      console.log('was not in set');
    }
  }

  public async checkActiveCollabs(docId: string) {
    const docIdString = docId.toString();
    const array = await this.asyncSmembers(`room:${docIdString}`);
    console.log('array from check', array);
    return array;
  }

  public async getActiveUsers(sockets: string[]) {
    let activeUsers: any = [];
    for (const socket of sockets) {
      const userInfo = await this.asyncHgetall(`socket:${socket}`);
      if (userInfo) {
        activeUsers.push(userInfo);
      }
    };
    return activeUsers;
  }

  public async getUser(socketId: string): Promise<any> {
    const user = await this.asyncHgetall(`socket:${socketId}`);
    console.log('user from get user', user);
    if (!user) {
      throw new WsException('missing user');
    }
    return user;
  }

}
