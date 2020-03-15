import { connect, Mongoose } from 'mongoose';
import { FileUtils } from './../util/file-utils';

class Database {
  private _mongoose: Mongoose | undefined;

  public connect(): Promise<Mongoose> {
    if (this._mongoose) {
      return new Promise(() => this._mongoose);
    } else {
      return FileUtils.getResource('database-configuration')
        .then(databaseConfiguration => connect(databaseConfiguration.host))
        .then((mongoose: Mongoose) => {
          this._mongoose = mongoose;
          return this._mongoose;
        });
    }
  }
}

export const database = new Database();
