import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AT_Strategy, RT_Strategy } from './strategies/index';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AT_Strategy, RT_Strategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    JwtModule.register({}),
  ],
})
export class AuthModule {}
