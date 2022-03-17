import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  async createUser(request: CreateUserDto) {}

  async findUser() {}

  async find() {}

  async update() {}

  async remove() {}
}
