import { CanActivate, ExecutionContext } from '@nestjs/common';

import { User } from 'src/users/user.entity';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<{ currentUser: User }>();

    if (!request.currentUser) return false;

    return request.currentUser.admin;
  }
}
