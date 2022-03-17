import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(request: CreateUserDto): Promise<User> {
    const user = this.repo.create(request);

    return this.repo.save(user);
  }

  async findUser(id: number) {
    return this.repo.findOne(id);
  }

  async find() {
    return this.repo.find();
  }

  async update() {}

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
