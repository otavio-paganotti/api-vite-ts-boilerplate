import { Schema } from 'mongoose';
import { findByName, findOneOrCreate } from './statics';
import { sameName, setUpdatedAt } from './methods';
import { IUser, IUserModel } from './types';

const UserSchema = new Schema<IUser, IUserModel>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  updatedAt: { type: Date, default: new Date() },
  createdAt: { type: Date, default: new Date() },
});

UserSchema.statics.findOneOrCreate = findOneOrCreate;
UserSchema.statics.findByName = findByName;

UserSchema.methods.setUpdatedAt = setUpdatedAt;
UserSchema.methods.sameName = sameName;

export default UserSchema;
