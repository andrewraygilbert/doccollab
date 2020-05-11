import { SubscribeMessage, WebSocketGateway, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { DocumentsService } from './documents.service';
import { AppDocBase, CreateDocDto } from '@doccollab/api-interfaces';
import { UseGuards } from '@nestjs/common';
import { WsGuard } from '../auth/ws.guard';

@WebSocketGateway()
export class DocumentsGateway {

  constructor(
    private docService: DocumentsService,
    ) {}

  @UseGuards(WsGuard)
  @SubscribeMessage('testing')
  async testing(@ConnectedSocket() socket: Socket, @MessageBody() body: any) {
    console.log('received testing event');
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('create.document')
  async createDocument(@ConnectedSocket() socket: Socket, @MessageBody() createDocDto: CreateDocDto): Promise<void> {
    const newDoc = await this.docService.createDocument(socket, createDocDto);
    socket.emit('new.document', newDoc);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('get.documents')
  async getDocuments(@ConnectedSocket() socket: Socket) {
    const documents = await this.docService.getDocuments(socket);
    socket.emit('return.documents', documents);
  }

}
