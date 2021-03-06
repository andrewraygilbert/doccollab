import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel, CreateUserDTO, User, AuthUser } from '@doccollab/api-interfaces';
import { Model } from 'mongoose';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User') private userModel: Model<UserModel>
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const createdUser = await new this.userModel(createUserDTO);
    await createdUser.save();
    return createdUser;
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find({}).exec();
  }

  async findUserById(_id: string): Promise<User> {
    const user = await this.userModel.findById(_id).exec();
    if (!user) {
      throw new HttpException('Could not locate user', 400);
    }
    return user;
  }

  async userModelById(_id: string): Promise<UserModel> {
    const user = await this.userModel.findById(_id).exec();
    if (!user) {
      throw new WsException('could not locate');
    }
    return user;
  }

  async findByUsername(username: string): Promise<AuthUser> {
    const user = await this.userModel.findOne({'username' : username}).exec();
    if (!user) {
      throw new HttpException('Could not locate user.', 400);
    }
    return user;
  }

  async userModelByUsername(username: string): Promise<UserModel> {
    const user = await this.userModel.findOne({'username' : username}).exec();
    if (!user) {
      throw new WsException('cannot locate user');
    }
    return user;
  }

}
