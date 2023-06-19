import { Document, Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  age: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IUserDocument extends IUser, Document {
  setUpdatedAt: (this: IUserDocument) => Promise<void>;
  sameName: (this: IUserDocument) => Promise<Document[]>;
};

export interface IUserModel extends Model<IUserDocument> {
  findOneOrCreate: (
    this: IUserModel,
    {
      name,
      email,
      age
    }: IUser,
  ) => Promise<IUserDocument>;
  findByName: (this: IUserModel, name?: string) => Promise<IUserDocument[]>;
};
