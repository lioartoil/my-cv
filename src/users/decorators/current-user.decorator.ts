import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { User } from '../user.entity';

export const CurrentUser = createParamDecorator((_: never, context: ExecutionContext) => {
  return context.switchToHttp().getRequest<{ currentUser: User }>().currentUser;
});
