import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(request: Request, _response: Response, next: NextFunction) {
    const { userId } = request.session ?? {};

    if (userId) {
      const user = await this.usersService.findOne(userId);

      request.currentUser = user;
    }

    next();
  }
}
