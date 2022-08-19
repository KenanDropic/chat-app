import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { ConnectedUserService } from './connected-user.service';
import { ConnectedUser } from './entities/connected-user-entity';
import { JoinedRoom } from './entities/joined-room.entity';
import { Message } from './entities/message.entity';
import { JoinedRoomService } from './joined-room.service';
import { MessagesService } from './messages.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([User, Room, ConnectedUser, JoinedRoom, Message]),
  ],
  providers: [
    ChatGateway,
    ChatService,
    RoomsService,
    ConnectedUserService,
    JoinedRoomService,
    MessagesService,
  ],
})
export class ChatModule {}
