import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
}
