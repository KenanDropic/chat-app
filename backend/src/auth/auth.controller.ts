import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoggedUser } from './decorators/logged-user.decorator';
import { Public } from './decorators/public.decorator';
import { RegisterUserDto, LoginUserDto } from './dto/index';
import { RTGuard } from './guards';
import {
  ResponseMessage,
  UserPassportPayload,
  UserRefreshPassportPayload,
} from './types/index';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Post('/register')
  register(
    @Res({ passthrough: true }) res: Response,
    @Body() body: RegisterUserDto,
  ): Promise<ResponseMessage> {
    return this.authService.signup(res, body);
  }

  @Public()
  @Post('/login')
  login(
    @Res({ passthrough: true }) res: Response,
    @Body() body: LoginUserDto,
  ): Promise<ResponseMessage> {
    return this.authService.signin(res, body);
  }

  @Serialize(UserDto)
  @Get('/me')
  async getLoggedUser(@LoggedUser() user: UserPassportPayload) {
    return await this.usersService.findOne(user.sub);
  }

  @Public()
  @UseGuards(RTGuard)
  @Get('/refresh')
  async refreshToken(
    @LoggedUser() user: UserRefreshPassportPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refreshToken(
      user.sub,
      user.refreshToken,
      res,
    );
  }

  @Post('/logout')
  logoutUser(
    @LoggedUser() user: UserPassportPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(user.sub, res);
  }
}
