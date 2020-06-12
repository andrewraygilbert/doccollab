import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { SocketsModule } from '../sockets/sockets.module';
import { DocumentsGateway } from './documents.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentSchema } from './document.schema';
import { AuthModule } from '../auth/auth.module';
import { UserSchema } from '../users/user.schema';
import { UsersModule } from '../users/users.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    SocketsModule,
    MongooseModule.forFeature([
      { name: 'AppDocument', schema: DocumentSchema},
      { name: 'User', schema: UserSchema}
    ]),
    AuthModule,
    UsersModule,
    RedisModule
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentsGateway]
})
export class DocumentsModule {}
