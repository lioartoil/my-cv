import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserDto) {
    console.debug(body);

    return this.usersService.createUser(body);
  }

  async findUser() {
    return this.usersService.findUser();
  }

  async findAllUsers() {
    return this.usersService.find();
  }

  async updateUser() {
    return this.usersService.update();
  }

  async removeUser() {
    return this.usersService.remove();
  }
}
