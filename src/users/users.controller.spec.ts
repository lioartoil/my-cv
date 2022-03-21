import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeAuthService: Partial<AuthService>;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeAuthService = { signIn: () => {}, signUp: () => {} };
    fakeUsersService = { find: () => {}, findOne: () => {}, remove: () => {}, update: () => {} };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
