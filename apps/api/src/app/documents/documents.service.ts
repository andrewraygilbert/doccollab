import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WsException } from '@nestjs/websockets';
import { AppDocument, AppDocBase, CreateDocDto, User, UserModel } from '@doccollab/api-interfaces';
import { Socket } from 'socket.io';
import { WsAuth } from '../auth/ws.auth';

@Injectable()
export class DocumentsService {

  constructor(
    @InjectModel('AppDocument') private docModel: Model<AppDocument>,
    @InjectModel('User') private userModel: Model<UserModel>,
    private wsAuth: WsAuth,
  ) {}

  public async createDocument(socket: Socket, createDocDto: CreateDocDto): Promise<AppDocBase> {
    const payload = await this.wsAuth.validate(socket.handshake.query.token);
    const user = await this.userModel.findById(payload.sub);
    if (!user) {
      throw new WsException('no');
    }
    const newDoc = {
      title: createDocDto.title,
      owner: {
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user._id,
        username: user.username
      }
    }
    const doc = await new this.docModel(newDoc);
    await doc.save();
    return doc;
  }

  /*
  public async getDocuments(socket: Socket): Promise<AppDocument[]> {

  }
  */
}
