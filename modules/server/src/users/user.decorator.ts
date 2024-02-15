import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from './entities/user.entity';

export const User = createParamDecorator(
  (_, ctx: ExecutionContext): UserDocument => {
    return ctx.switchToHttp().getRequest().user;
  },
);
