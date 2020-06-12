import { Injectable } from '@nestjs/common';
import * as redis from 'redis';
import { environment } from './../../../environments/environment';

@Injectable()
export class RedisCoreService {

  private client: redis.RedisClient;

  constructor() {
    this.client = redis.createClient(environment.REDIS_URI);
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
