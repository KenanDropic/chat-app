import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [UsersModule, JwtModule.register({})],
})
export class ChatModule {}
