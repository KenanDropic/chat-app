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
import { PageDto } from 'src/pagination/dto/page.dto';
import { Room } from './entities/room.entity';
import { RoomDataDto } from './dto/room-data.dto';
import { ConnectedUserService } from './connected-user.service';
import { ConnectedUser } from './entities/connected-user-entity';
import { OnModuleInit } from '@nestjs/common';
import { JoinedRoomService } from './joined-room.service';
import { MessagesService } from './messages.service';
import { MessageDto } from './dto/message.dto';
import { JoinedRoom } from './entities/joined-room.entity';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  constructor(
    private readonly chatService: ChatService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly roomsService: RoomsService,
    private readonly connectedUserService: ConnectedUserService,
    private readonly joinedRoomService: JoinedRoomService,
    private readonly messagesService: MessagesService,
  ) {}

  @WebSocketServer()
  server: Server;

  // on module init delete all connections
  async onModuleInit() {
    await this.connectedUserService.deleteAll();
    await this.joinedRoomService.deleteAll();
  }

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

    // save connection to DB
    await this.connectedUserService.create({ socketId: socket.id, user });

    // find users that are online
    this.findConnectedUsers(socket);

    // only emit rooms to the specific connected client
    return this.server.to(socket.id).emit('rooms', rooms);
  }

  async handleDisconnect(socket: Socket, ...args: any[]) {
    this.chatService.disconnect(socket);
  }

  @SubscribeMessage('createRoom')
  async createRoom(socket: Socket, roomData: RoomDataDto): Promise<boolean> {
    const created = await this.roomsService.createRoom(
      roomData,
      socket.data.user,
    );

    for (const user of created.users) {
      const connections: ConnectedUser[] =
        await this.connectedUserService.findByUser(user);

      const rooms = await this.roomsService.getUserRooms(user.id, {
        page: 1,
        take: 8,
      });

      for (const connection of connections) {
        return this.server.to(connection.socketId).emit('rooms', rooms);
      }
    }
  }

  @SubscribeMessage('paginateRoom')
  async getPaginatedUserRooms(
    socket: Socket,
    query: PageOptionsDto,
  ): Promise<boolean> {
    const rooms: PageDto<Room> = await this.roomsService.getUserRooms(
      socket.data.user.id,
      query,
    );

    return this.server.to(socket.id).emit('rooms', rooms);
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(socket: Socket, room: Room) {
    const messages = await this.messagesService.findMessagesForRoom(room, {
      take: 10,
      page: 1,
    });

    // save connection to a room
    await this.joinedRoomService.create({
      socketId: socket.id,
      user: socket.data.user,
      room,
    });

    // send last messages from room to user
    this.server.to(socket.id).emit('messages', messages);
  }

  @SubscribeMessage('leaveRoom')
  async onLeaveRoom(socket: Socket) {
    // remove connection from joinedRooms
    await this.joinedRoomService.deleteBySocketId(socket.id);
  }

  @SubscribeMessage('addMessage')
  async addMessage(socket: Socket, message: MessageDto) {
    const createdMessage = await this.messagesService.create({
      ...message,
      user: socket.data.user,
    });

    const room = await this.roomsService.getRoom(createdMessage.room.id);

    const joinedUsers: JoinedRoom[] = await this.joinedRoomService.findByRoom(
      room,
    );

    // TO DO - send new messages to all joined Users of the room (currently online)
  }

  @SubscribeMessage('findConnected')
  async findConnectedUsers(socket: Socket): Promise<boolean> {
    const connectedUsers: ConnectedUser[] =
      await this.connectedUserService.findConnectedUsers(socket.id);

    return this.server.to(socket.id).emit('connectedUsers', connectedUsers);
  }
}
