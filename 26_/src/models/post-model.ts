import { Model, model, Schema, Types } from 'mongoose';
import { IModelCommon } from './model-common';

export interface IPostModel extends IModelCommon {
  title?: string;
  imageUrl?: string;
  content?: string;
  creator?: Types.ObjectId;
}

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    content: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
);

PostSchema.methods.toResource = function(): Object {
  return { ...this._doc, imageUrl: `http://localhost:8080/image/${this.imageUrl}` };
};

export const PostModel: Model<IPostModel> = model<IPostModel>('Post', PostSchema);
