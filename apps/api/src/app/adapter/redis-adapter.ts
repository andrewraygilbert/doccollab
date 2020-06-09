import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';
import { environment } from './../../environments/environment';

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    let redisAdapter: any;
    if (environment.production === true) {
      redisAdapter = redisIoAdapter(environment.REDIS_URI);
    } else {
      redisAdapter = redisIoAdapter({ host: 'localhost', port: 6379 });
    }
    server.adapter(redisAdapter);
    return server;
  }
}
