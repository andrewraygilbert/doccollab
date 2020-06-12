import { Module } from '@nestjs/common';
import { RedisCoreService } from './redis-core/redis-core.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [RedisCoreService],
  exports: [RedisCoreService]
})
export class RedisModule {}
