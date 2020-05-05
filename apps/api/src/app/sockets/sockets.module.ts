import { Module } from '@nestjs/common';
import { SocketCoreGateway } from './socket-core.gateway';

@Module({
  providers: [SocketCoreGateway]
})
export class SocketsModule {}
