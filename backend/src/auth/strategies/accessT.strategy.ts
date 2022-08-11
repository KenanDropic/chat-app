import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPassportPayload } from '../types';
import { Request } from 'express';

@Injectable()
export default class AT_Strategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_AT_SECRET}`,
    });
  }
  validate(payload: UserPassportPayload) {
    if (!payload) throw new UnauthorizedException();
    if (payload === null) throw new UnauthorizedException();

    return payload;
  }

  // constructor() {
  //   super({
  //     jwtFromRequest: ExtractJwt.fromExtractors([
  //       (request: Request) => {
  //         let data = request?.cookies['jwt-at'];
  //         if (!data) return null;
  //         return data;
  //       },
  //     ]),
  //     ignoreExpiration: false,
  //     secretOrKey: `${process.env.JWT_AT_SECRET}`,
  //     passReqToCallback: true,
  //   });
  // }
  // validate(req: Request, payload: any) {
  //   if (!payload) throw new UnauthorizedException('Invalid JWT');
  //   if (payload === null) throw new UnauthorizedException();
  //   const accessToken = req?.cookies['jwt-at'];
  //   if (!accessToken) {
  //     throw new UnauthorizedException('Invalid JWT');
  //   }
  //   return payload;
  // }
}
