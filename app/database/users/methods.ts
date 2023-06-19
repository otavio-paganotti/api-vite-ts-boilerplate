import { Document } from 'mongoose';
import { IUserDocument } from './types';

export async function setUpdatedAt(this: IUserDocument): Promise<void> {
  const now = new Date();
  if (!this.updatedAt || this.updatedAt < now) {
    this.updatedAt = now;
    await this.save();
  }
};

export async function sameName(this: IUserDocument): Promise<Document[]> {
  return this.$model('user').find({ name: this.name });
};
