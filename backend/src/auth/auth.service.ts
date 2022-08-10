import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto, LoginUserDto } from './dto/index';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ResponseMessage } from './types/index';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User) private repo: Repository<User>,
  ) {}

  /* --------------------------------------------------- */

  async hashData(data: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);
    return bcrypt.hash(data, salt);
  }

  async getAccessToken(id: number): Promise<string> {
    return await this.jwtService.signAsync(
      { sub: id },
      {
        secret: `${process.env.JWT_AT_SECRET}`,
        expiresIn: `${process.env.ACCESS_TOKEN_EXPIRE}`,
      },
    );
  }

  async getRefreshToken(id: number): Promise<string> {
    return await this.jwtService.signAsync(
      { sub: id },
      {
        secret: `${process.env.JWT_RT_SECRET}`,
        expiresIn: `${process.env.REFRESH_TOKEN_EXPIRE}`,
      },
    );
  }

  async updateRTHash(id: number, rt: string) {
    if (!rt || !id) throw new BadRequestException();

    const hash: string = await this.hashData(rt);

    const user = await this.usersService.findOne(id);

    user.hashedRT = hash;

    return this.repo.save(user);
  }

  /* --------------------------------------------------- */

  async signup(
    @Res({ passthrough: true }) res: Response,
    body: RegisterUserDto,
  ): Promise<ResponseMessage> {
    const { email } = body;

    const exists = await this.usersService.findOneByEmail(email);

    if (exists) throw new BadRequestException('User already exists');

    const user: User = await this.usersService.create(body);

    const accessToken: string = await this.getAccessToken(user.id);
    const refreshToken: string = await this.getRefreshToken(user.id);

    res.cookie('jwt-at', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.cookie('jwt-rt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    await this.updateRTHash(user.id, refreshToken);

    return {
      success: true,
      message: 'User Registered Successfully',
    };
  }

  async signin(
    @Res({ passthrough: true }) res: Response,
    body: LoginUserDto,
  ): Promise<ResponseMessage> {
    const { email, password } = body;

    const user: User = await this.usersService.findOneByEmail(email);

    if (!user) throw new BadRequestException('Invalid credentials');

    const matches: boolean = await bcrypt.compare(password, user.password);

    if (!matches) throw new BadRequestException('Invalid credentials');

    const accessToken: string = await this.getAccessToken(user.id);
    const refreshToken: string = await this.getRefreshToken(user.id);

    res.cookie('jwt-at', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.cookie('jwt-rt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    await this.updateRTHash(user.id, refreshToken);

    return {
      success: true,
      message: 'User Logged Successfully',
    };
  }

  async refreshToken(
    userId: number,
    rt: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseMessage> {
    const user: User = await this.repo.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new ForbiddenException('Unauthorized');

    res.clearCookie('jwt-at', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.clearCookie('jwt-rt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    const rtMatches: boolean = await bcrypt.compare(rt, user.hashedRT);

    if (!rtMatches) throw new ForbiddenException('Unauthorized');

    const accessToken: string = await this.getAccessToken(user.id);
    const refreshToken: string = await this.getRefreshToken(user.id);
    await this.updateRTHash(user.id, refreshToken);

    // // 5 days
    // res.cookie('jwt-rt', refresh_token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    //   maxAge: 60 * 60 * 24 * 5,
    // });

    res.cookie('jwt-at', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.cookie('jwt-rt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return {
      success: true,
      message: 'Token refreshed successfully',
    };
  }

  async logout(userId: number, res: Response): Promise<ResponseMessage> {
    const user: User = await this.repo.findOne({
      where: {
        id: userId,
      },
    });

    if (user.hashedRT === '') {
      return { success: true, message: 'Hash is already empty' };
    }

    res.clearCookie('jwt-at', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.clearCookie('jwt-rt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    user.hashedRT = '';
    await this.repo.save(user);

    return { success: true, message: 'Logout successful' };
  }
}
