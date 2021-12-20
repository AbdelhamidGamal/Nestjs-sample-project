import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const currentUser = createParamDecorator(
  (data: never, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
