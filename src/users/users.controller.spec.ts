import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeAuthService: Partial<AuthService>;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeAuthService = {
      signIn: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
      // signUp: () => {},
    };
    fakeUsersService = {
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'P@ssw0rd' } as User]);
      },
      findOne: (id: number) => {
        return Promise.resolve({ id, email: 'test@test.com', password: 'P@ssw0rd' } as User);
      },
      // remove: () => {},
      // update: () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('test@test.com');

    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@test.com');
  });

  it('findUser returns a single user with the given ID', async () => {
    const user = await controller.findUser('1');

    expect(user).toBeDefined();
  });

  it('findUser throws and error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;

    const findUser = controller.findUser('1');

    await expect(findUser).rejects.toBeInstanceOf(NotFoundException);
  });

  it('signIn updates session object and returns user', async () => {
    const session = { userId: null };
    const user = await controller.signIn({ email: 'test@test.com', password: 'P@ssw0rd' }, session);

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
