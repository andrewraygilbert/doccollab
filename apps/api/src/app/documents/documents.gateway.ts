import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { DocumentsService } from './documents.service';

@WebSocketGateway()
export class DocumentsGateway {

  constructor(
    private docService: DocumentsService,
  ) {}

  @SubscribeMessage('testing')
  async testing() {
    console.log('received testing');
  }

}
