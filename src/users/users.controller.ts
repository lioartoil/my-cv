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
  Session,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/guards/auth.guard';

import { Serialize } from '../interceptors/serialize.interceptor';

import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserCredentialDto } from './dtos/user-credential.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('who-am-i')
  whoAmI(@CurrentUser() user: UserDto) {
    return user;
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.NO_CONTENT)
  signOut(@Session() session: Record<string, unknown>) {
    session.userId = null;
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() { email, password }: UserCredentialDto,
    @Session() session: Record<string, unknown>,
  ) {
    const user = await this.authService.signUp(email, password);

    session.userId = user.id;

    return user;
  }

  @Post('sign-in')
  async signIn(
    @Body() { email, password }: UserCredentialDto,
    @Session() session: Record<string, unknown>,
  ) {
    const user = await this.authService.signIn(email, password);

    session.userId = user.id;

    return user;
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
