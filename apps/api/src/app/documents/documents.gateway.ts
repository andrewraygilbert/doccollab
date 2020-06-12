import { SubscribeMessage, WebSocketGateway, ConnectedSocket, MessageBody, WsException, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { DocumentsService } from './documents.service';
import { CreateDocDto } from '@doccollab/api-interfaces';
import { UseGuards } from '@nestjs/common';
import { WsGuard } from '../auth/ws.guard';
import { RedisCoreService } from '../redis/redis-core/redis-core.service';

@WebSocketGateway({"pingTimeout" : 30000})
export class DocumentsGateway {

  @WebSocketServer()
  server: Server

  constructor(
    private docService: DocumentsService,
    private redis: RedisCoreService,
    ) {}

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
  @SubscribeMessage('save.document.req')
  async saveDocument(@ConnectedSocket() socket: Socket, @MessageBody() body: any) {
    const success = this.docService.saveDocument(socket, body);
    if (success) {
      return 'it saved';
    }
    throw new WsException('it did not save');
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('send.document.active')
  async sendActiveDocument(@ConnectedSocket() socket: Socket, @MessageBody() body: any) {
    socket.to(body.toSocketId).emit('send.document.active', body);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('req.document')
  async getDocument(@ConnectedSocket() socket: Socket, @MessageBody() body: any) {
    const document = await this.docService.getDocument(socket, body);
    if (document.collaborators.length > 0) {
      // ask any sockets in the room to send the active document and state
      this.server.to(document._id).emit('get.document.active', { 'socketId' : socket.id });
      const docOut = {
        document: document,
        collab: true
      };
      socket.emit('res.document', docOut);
      this.joinDocRoom(socket, document._id);
    } else {
      const docOut = {
        document: document,
        collab: false
      };
      socket.emit('res.document', docOut);
      this.joinDocRoom(socket, document._id);
    }
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

  @UseGuards(WsGuard)
  @SubscribeMessage('leave.room')
  public leaveRoom(socket: Socket) {
    console.log('leaving the room');
    if (Object.keys(socket.rooms)[1]) {
      this.redis.leaveRoom(`room:${Object.keys(socket.rooms)[1]}`, socket.id);
      socket.leave(Object.keys(socket.rooms)[1]);
    }
  }

  private joinDocRoom(socket: Socket, docId: string) {
    if (Object.keys(socket.rooms)[1]) {
      socket.leave(Object.keys(socket.rooms)[1]);
    }
    socket.join(docId);
    console.log('join room id: ', docId);
    this.redis.joinRoom(`room:${docId}`, socket.id);
  }

}
