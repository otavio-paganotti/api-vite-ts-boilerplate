import mongoose, { Model, Schema } from "mongoose";
import BaseModel from "@app/models/baseModel";
import { User } from "@app/types";

class UserModel extends BaseModel {
  schema: Schema<User>;
  model: Model<User>;

  constructor() {
    super();

    this.schema = new mongoose.Schema<User>();

    this.model = mongoose.model('User', this.schema);
  }
}

export default new UserModel();
