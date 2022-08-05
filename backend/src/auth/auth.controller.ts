import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './dto/index';
import { ResponseMessage } from './types/index';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/register')
  register(
    @Res({ passthrough: true }) res: Response,
    @Body() body: RegisterUserDto,
  ): Promise<ResponseMessage> {
    return this.authService.signup(res, body);
  }

  @Post('/login')
  login(
    @Res({ passthrough: true }) res: Response,
    @Body() body: LoginUserDto,
  ): Promise<ResponseMessage> {
    return this.authService.signin(res, body);
  }
}
