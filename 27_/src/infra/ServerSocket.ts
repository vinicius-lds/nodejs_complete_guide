import { Server } from 'http';
import socketio, { Server as SocketIOServer } from 'socket.io';

class ServerSocket {
  private io: SocketIOServer | undefined;
  public init(opts: SocketIOOptions) {
    this.io = socketio(opts.server);
    this.io.on('connect', () => console.log('Client connected'));
  }
  public on(event: string, listner: Function): void {
    this.io?.on(event, listner);
  }
  public emit(event: string, data: any): void {
    this.io?.emit(event, data);
  }
}

export interface SocketIOOptions {
  server: Server;
}

export default new ServerSocket();
