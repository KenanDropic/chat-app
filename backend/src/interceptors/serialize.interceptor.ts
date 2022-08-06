import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { User } from 'src/users/user.entity';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // running before the handler

    return next.handle().pipe(
      map((data: any) => {
        const reqPath = context.switchToHttp().getRequest().path;
        const reqMeth = context.switchToHttp().getRequest().method;

        if (reqPath === '/users' && reqMeth === 'GET') {
          data.data.map((user: User) => {
            delete user.password;
          });
          return data;
        }

        // running before the response is sent out
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
