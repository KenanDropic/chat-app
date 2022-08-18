import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ConnectedUserService } from './connected-user.service';

@Injectable()
export class ChatService {
  constructor(private readonly connectedUserService: ConnectedUserService) {}
  async disconnect(socket: Socket) {
    // remove connection from DB
    await this.connectedUserService.deleteBySocketId(socket.id);
    socket.disconnect();
  }
}
