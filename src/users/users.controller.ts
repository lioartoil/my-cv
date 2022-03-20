import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { Serialize } from '../interceptors/serialize.interceptor';

import { AuthService } from './auth.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserCredentialDto } from './dtos/user-credential.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() { email, password }: UserCredentialDto) {
    return this.authService.signUp(email, password);
  }

  @Post('sign-in')
  signIn(@Body() { email, password }: UserCredentialDto) {
    return this.authService.signIn(email, password);
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(Number(id));

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(Number(id), body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUser(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
