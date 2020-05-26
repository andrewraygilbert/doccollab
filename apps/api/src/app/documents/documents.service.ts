import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WsException } from '@nestjs/websockets';
import { AppDocument, CreateDocDto, AddCollabDto, Collaborator, AppDoc } from '@doccollab/api-interfaces';
import { Socket } from 'socket.io';
import { WsAuth } from '../auth/ws.auth';
import { UsersService } from '../users/users.service';

@Injectable()
export class DocumentsService {

  constructor(
    @InjectModel('AppDocument') private docModel: Model<AppDocument>,
    private usersService: UsersService,
    private wsAuth: WsAuth,
  ) {}

  public async createDocument(socket: Socket, createDocDto: CreateDocDto): Promise<AppDocument> {
    const user = await this.wsAuth.getUser(socket.handshake.query.token);
    const newDoc = {
      title: createDocDto.title,
      owner: {
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user._id,
        username: user.username
      }
    };
    const doc = await new this.docModel(newDoc);
    await doc.save();
    user.ownDocs.push(doc._id);
    await user.save();
    return doc;
  }

  public async getDocuments(socket: Socket): Promise<any> {
    const user = await this.wsAuth.getUser(socket.handshake.query.token);
    let documents: AppDocument[] = [];
    for (const docId of user.ownDocs) {
      const document = await this.docModel.findById(docId);
      if (!document) {
        throw new WsException('could not locate document');
      }
      documents.push(document);
    };
    let collabDocs: AppDocument[] = [];
    for (const docId of user.collabDocs) {
      const document = await this.docModel.findById(docId);
      if (!document) {
        throw new WsException('could not locate document');
      }
      collabDocs.push(document);
    };
    const docs = {
      ownDocs: documents,
      collabDocs: collabDocs
    };
    return docs;
  }

  public async findDocById(_id: string): Promise<AppDocument> {
    const doc = await this.docModel.findById(_id);
    if (!doc) {
      throw new WsException('Could not locate document');
    }
    return doc;
  }

  public async getDocument(socket: Socket, body: any): Promise<AppDocument> {
    const user = await this.wsAuth.getUser(socket.handshake.query.token);
    const doc = await this.findDocById(body._id);
    if (this.verifyDocAccess(user._id, doc)) {
      return doc;
    }
    throw new WsException('Unauthorized');
  }

  public async addCollaborator(socket: Socket, dto: AddCollabDto): Promise<Collaborator> {
    const user = await this.wsAuth.getUser(socket.handshake.query.token);
    const doc = await this.findDocById(dto.docId);
    if (await this.verifyDocOwner(user._id, doc)) {
      const collaborator = await this.usersService.userModelByUsername(dto.username);
      const collab: Collaborator = {
        userId: collaborator._id,
        firstName: collaborator.firstName,
        lastName: collaborator.lastName,
        username: collaborator.username,
        ownDocs: collaborator.ownDocs,
        collabDocs: collaborator.collabDocs,
        viewDocs: collaborator.viewDocs
      };
      doc.collaborators.push(collab);
      const newCollab = doc.collaborators[doc.collaborators.length - 1];
      await doc.save();
      collaborator.collabDocs.push(doc._id);
      await collaborator.save();
      return newCollab;
    }
    throw new WsException('Unauthorized');
  }

  private async verifyDocOwner(userId: string, doc: AppDocument): Promise<boolean> {
    console.log(userId, doc.owner.userId);
    if (userId == doc.owner.userId) {
      return true;
    }
    return false;
  }

  private async verifyDocAccess(userId: string, doc: AppDocument): Promise<boolean> {
    if (userId == doc.owner.userId) {
      return true;
    }
    const isCollab = doc.collaborators.findIndex(each => each.userId === userId);
    if (isCollab === -1) {
      return false;
    }
    return true;
  }

}
