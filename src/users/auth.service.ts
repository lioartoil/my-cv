import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (user) throw new UnprocessableEntityException('email in use');

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = `${salt}.${hash.toString('hex')}`;

    return this.usersService.create(email, result);
  }

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) throw new UnprocessableEntityException('Email or password incorrect');

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new UnprocessableEntityException('Email or password incorrect');
    }

    return user;
  }
}
