import { Types } from 'mongoose';

export class DatabaseUtils {
  public static toObjectId(value: any): Types.ObjectId {
    if (!value || value instanceof Types.ObjectId) {
      return value;
    } else {
      return new Types.ObjectId(value);
    }
  }
}
