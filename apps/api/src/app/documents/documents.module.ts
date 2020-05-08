import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { SocketsModule } from '../sockets/sockets.module';
import { DocumentsGateway } from './documents.gateway';

@Module({
  imports: [SocketsModule],
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentsGateway]
})
export class DocumentsModule {}
