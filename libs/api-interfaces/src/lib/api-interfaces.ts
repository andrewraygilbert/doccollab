import { Document } from 'mongoose';

export interface UserBase {
  firstName: string;
  lastName: string;
  username: string;
}

export interface CreateUserDTO extends UserBase {
  password: string;
}

export interface User extends UserBase {
  _id: string;
}

export interface UserModel extends UserBase, Document {}
