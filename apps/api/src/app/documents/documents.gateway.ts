import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { DocumentsService } from './documents.service';
import { AppDocBase, CreateDocDto } from '@doccollab/api-interfaces';
import { UseGuards, UsePipes } from '@nestjs/common';
import { WsGuard } from '../auth/ws.guard';
import { WsAuthPipe } from '../auth/ws-auth.pipe';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway()
export class DocumentsGateway {

  constructor(
    private docService: DocumentsService,
    private authService: AuthService,
  ) {}

  @UseGuards(WsGuard)
  @SubscribeMessage('testing')
  async testing(@ConnectedSocket() socket: Socket, @MessageBody() body: any) {
    console.log('received testing event');
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('create.document')
  async createDocument(@ConnectedSocket() socket: Socket, @MessageBody() createDocDto: CreateDocDto): Promise<AppDocBase> {
    return this.docService.createDocument(socket, createDocDto);
  }

  /*
  @UseGuards(WsGuard)
  @SubscribeMessage('get.documents')
  async getDocuments(@ConnectedSocket() socket: Socket): Promise<AppDocument[]> {
    return this.docService.getDocuments(socket);
  }
  */

}
