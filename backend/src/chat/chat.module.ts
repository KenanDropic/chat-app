import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { User } from 'src/users/user.entity';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([Chat, User, Room]),
  ],
  providers: [ChatGateway, ChatService, RoomsService],
})
export class ChatModule {}
