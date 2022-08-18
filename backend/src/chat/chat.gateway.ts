import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserPassportPayload } from 'src/auth/types';
import { User } from 'src/users/user.entity';
import { PageOptionsDto } from 'src/pagination/dto/page-options.dto';
import { RoomsService } from './rooms.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatService: ChatService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly roomsService: RoomsService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket, ...args: any[]) {
    const decodedToken = this.jwtService.decode(
      socket.handshake.headers.authorization,
    );

    let user: User;

    if (decodedToken !== null) {
      user = await this.usersService.findOne(
        (decodedToken as UserPassportPayload).sub,
      );
    }

    if (!user) {
      return this.chatService.disconnect(socket);
    }

    socket.data.user = user;
    const rooms = await this.roomsService.getUserRooms(user.id, {
      page: 1,
      take: 10,
    });

    // only emit rooms to the specific connected client
    return this.server.to(socket.id).emit('rooms', rooms);
  }

  async handleDisconnect(socket: Socket, ...args: any[]) {
    socket.disconnect();
  }

  @SubscribeMessage('createRoom')
  async createRoom(socket: Socket, roomData: any) {
    return this.roomsService.createRoom(roomData, socket.data.user);
  }

  @SubscribeMessage('paginateRoom')
  async getPaginatedUserRooms(socket: Socket, query: PageOptionsDto) {
    const rooms = await this.roomsService.getUserRooms(
      socket.data.user.id,
      query,
    );

    return this.server.to(socket.id).emit('rooms', rooms);
  }
}
