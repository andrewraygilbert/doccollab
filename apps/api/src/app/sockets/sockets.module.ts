import { Module } from '@nestjs/common';
import { SocketCoreGateway } from './socket-core.gateway';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [SocketCoreGateway],
  exports: [SocketCoreGateway]
})
export class SocketsModule {}
