import { UnprocessableEntityException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

const fakeEmail = 'test@test.com';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];

    fakeUsersService = {
      create: (email: string, password: string) => {
        const user = { id: Math.floor(Math.random() * 999_999), email, password } as User;

        users.push(user);

        return Promise.resolve(user);
      },
      find: (email: string) => {
        const filteredUsers = users.filter(user => user.email === email);

        return Promise.resolve(filteredUsers);
      },
    };

    const module = await Test.createTestingModule({
      providers: [AuthService, { provide: UsersService, useValue: fakeUsersService }],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user with a salted and hashed password', async () => {
    const user = await service.signUp(fakeEmail, 'P@ssw0rd');
    const [salt, hash] = user.password.split('.');

    expect(user.password).not.toEqual('password');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throw an error if user signs up with email that is in use', async () => {
    await service.signUp(fakeEmail, 'P@ssw0rd');

    try {
      await service.signUp(fakeEmail, 'P@ssw0rd');
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityException);
    }
  });

  it('throws if sign in is called with an unused email', async () => {
    try {
      await service.signIn(fakeEmail, 'P@ssw0rd');
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityException);
    }
  });

  it('throws if an invalid password is provided', async () => {
    await service.signUp(fakeEmail, 'P@ssw0rd');

    try {
      await service.signIn(fakeEmail, '12345678');
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityException);
    }
  });

  it('returns a user if correct password is provided', async () => {
    await service.signUp(fakeEmail, 'P@ssw0rd');

    const user = await service.signIn(fakeEmail, 'P@ssw0rd');

    expect(user).toBeDefined();
  });
});
