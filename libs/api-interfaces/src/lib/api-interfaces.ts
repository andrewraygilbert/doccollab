import { Document } from 'mongoose';

export interface UserBase {
  firstName: string;
  lastName: string;
  username: string;
  ownDocs: string[];
  collabDocs: string[];
  viewDocs: string[];
}

export interface AuthUser extends User, UserBase {
  password: string;
}

export interface CreateUserDTO extends UserBase {
  password: string;
}

export interface Collaborator extends UserBase {
  _id: string;
}

export interface AppDocument {
  title: string;
  owner: Collaborator,
  collaborators: [Collaborator],
  viewers: [Collaborator]
  content: {}
}

export interface User extends UserBase {
  _id: string;
}

export interface UserModel extends UserBase, Document {
  password: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface TokenObject {
  access_token: string;
}


