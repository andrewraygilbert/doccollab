import { SubscribeMessage, WebSocketGateway, ConnectedSocket, MessageBody, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { DocumentsService } from './documents.service';
import { CreateDocDto } from '@doccollab/api-interfaces';
import { UseGuards } from '@nestjs/common';
import { WsGuard } from '../auth/ws.guard';

@WebSocketGateway({"pingTimeout" : 30000})
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

  @UseGuards(WsGuard)
  @SubscribeMessage('req.document')
  async getDocument(@ConnectedSocket() socket: Socket, @MessageBody() body: any) {
    const document = await this.docService.getDocument(socket, body);
    socket.emit('res.document', document);
    this.joinDocRoom(socket, document._id);
  }

  @SubscribeMessage('out.edit.doc')
  public emitEdits(@ConnectedSocket() socket: Socket, @MessageBody() body: any) {
    console.log('received a delta', body);
    socket.to(Object.keys(socket.rooms)[1]).emit('in.edit.doc', body);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('add.collaborator.req')
  public async addCollaborator(@ConnectedSocket() socket: Socket, @MessageBody() body: any) {
    const collaborator = await this.docService.addCollaborator(socket, body);
    if (collaborator) {
      socket.emit('add.collaborator.res', collaborator);
    } else {
      throw new WsException('Something went wrong');
    }
  }

  private joinDocRoom(socket: Socket, docId: string) {
    if (Object.keys(socket.rooms)[1]) {
      socket.leave(Object.keys(socket.rooms)[1]);
    }
    socket.join(docId);
    console.log('joining a room');
  }

}
