import { Document } from 'mongoose';

/**
 * USER INTERFACES
 */

export interface UserBase {
  firstName: string;
  lastName: string;
  username: string;
  ownDocs: string[];
  collabDocs: string[];
  viewDocs: string[];
}

export interface UserModel extends UserBase, Document {
  password: string;
}

export interface User extends UserBase {
  _id: string;
}

export interface AuthUser extends User, UserBase {
  password: string;
}

export interface CreateUserDTO extends UserBase {
  password: string;
}

export interface Collaborator extends UserBase {
  userId: string;
}

export interface AddCollabDto {
  username: string;
  docId: string;
}

export interface RedisUser {
  socketId: string,
  userId: string,
  username: string,
  firstName: string,
  lastName: string
}

/**
 * DOCUMENT INTERFACES
 */

export interface CreateDocDto {
  title: string;
}

export interface AppDocBase extends CreateDocDto {
  owner: Collaborator;
  savedDate: Date;
  collaborators: Collaborator[];
  viewers: Collaborator[];
  content: {};
}

export interface AppDoc extends AppDocBase {
  _id: string;
}

export interface AppDocument extends AppDocBase, Document {}

export interface DocOutDto {
  document: AppDoc,
  activeUsers: RedisUser[],
  activeSockets: boolean,
  collab: boolean
}

export interface ActiveDocDto {
  content: {},
  incomingRecord: DeltaRecord[],
  outgoingRecord: DeltaDto[],
  fromSocketId: string,
  toSocketId: string
}

/**
 * AUTH INTERFACES
 */

export interface Credentials {
  username: string;
  password: string;
}

export interface TokenObject {
  access_token: string;
}

/**
 * DELTA INTERFACES
 */

export interface DeltaRecord {
  socketId: string;
  deltas: DeltaDto[];
}

export interface DeltaDtoRecord {
  socketId: string;
  deltaId: number;
}

export interface BaseDelta {
  ops: [any];
}

export interface DeltaDto extends BaseDelta {
  socketId: string;
  localId: number;
  localRecord: DeltaDtoRecord[];
  precedenceAdj?: boolean;
}

export interface PurgeRecord {
  socketId: string,
  deltaId: number,
  count: number
}


