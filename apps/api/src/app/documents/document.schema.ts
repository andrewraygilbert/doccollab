import * as mongoose from 'mongoose';

const CollaboratorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  userId: String
});

export const DocumentSchema = new mongoose.Schema({
  title: String,
  owner: CollaboratorSchema,
  collaborators: [CollaboratorSchema],
  viewers: [CollaboratorSchema],
  content: {}
});
