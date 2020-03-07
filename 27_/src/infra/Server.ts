import express, { Express } from 'express';
import { database } from './Database';
import ServerSocket from './ServerSocket';

class Server {
  public init(opts: ServerOptions) {
    const app = express();
    opts.registerRoutes(app);
    database
      .connect()
      .then(() => {
        console.log('Connected to MongoDB');
        const server = app.listen(8080);
        console.log('Server is up and running!');
        ServerSocket.init({ server: server });
      })
      .catch(err => {
        console.error('Error connecting to MongoDB');
        console.error(err);
      });
  }
}

export class ServerOptions {
  port: Number = 8080;
  registerRoutes(app: Express): void {}
}

export default new Server();
