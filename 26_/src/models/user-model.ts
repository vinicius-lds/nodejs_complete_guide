import { model, Schema } from 'mongoose';
import { IModelCommon } from './model-common';

export interface IUserModel extends IModelCommon {
  email?: string;
  password?: string;
  name?: string;
  status?: string;
  posts?: Schema.Types.ObjectId[];
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ]
  },
  {
    timestamps: true
  }
);
UserSchema.methods.toResource = function(): Object {
  return { ...this._doc };
};

export const UserModel = model<IUserModel>('User', UserSchema);
