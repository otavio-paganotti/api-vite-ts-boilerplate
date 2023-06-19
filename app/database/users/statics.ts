import { IUser, IUserDocument, IUserModel } from './types';

export async function findOneOrCreate(
  this: IUserModel,
  {
    name,
    email,
    age
  }: IUser,
): Promise<IUserDocument> {
  const userRecord = await this.findOne({
    name,
    email,
    age
  });
  if (userRecord) {
    return userRecord;
  } else {
    return this.create({
      name,
      email,
      age
    });
  }
}

export async function findByName(
  this: IUserModel,
  name?: string
): Promise<IUserDocument[]> {
  return this.find({ name });
}
