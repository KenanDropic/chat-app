import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export default class RT_Strategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let data = request?.cookies['jwt-rt'];

          if (!data) return null;

          return data;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_AT_SECRET}`,
      passReqToCallback: true,
    });
  }
  validate(req: Request, payload: any) {
    console.log('REFRESH TOKEN PAYLOAD', payload);

    if (!payload) throw new UnauthorizedException('Invalid JWT');

    if (payload === null) throw new UnauthorizedException();

    const refreshToken = req?.cookies['jwt-rt'];

    if (!refreshToken) throw new UnauthorizedException();

    return {
      ...payload,
      refreshToken,
    };
  }
}
