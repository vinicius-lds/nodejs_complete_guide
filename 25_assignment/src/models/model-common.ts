import { Document } from 'mongoose';

export interface IModelCommon extends Document {
  toResource(): Object;
}
