import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(email: string, password: string) {
    const users = await this.usersService.find(email);

    if (users.length) throw new UnprocessableEntityException('email in use');
  }

  signIn() {}
}
