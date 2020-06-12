import { Module } from '@nestjs/common';
import { RedisCoreService } from './redis-core/redis-core.service';

@Module({
  providers: [RedisCoreService],
  exports: [RedisCoreService]
})
export class RedisModule {}
