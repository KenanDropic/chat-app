import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const LoggedUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    // console.log('Current user decorator', request.user);

    if (!data) return request.user;

    return request.user[data];
  },
);
