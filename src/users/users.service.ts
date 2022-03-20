import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number) {
    return this.repo.findOne(id);
  }

  async find(email: string) {
    return this.repo.find({ email });
  }

  async update(id: number, attributes: Partial<User>) {
    const user = await this.repo.findOne(id);

    if (!user) throw new NotFoundException('user not found');

    Object.assign(user, attributes);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOne(id);

    if (!user) throw new NotFoundException('user not found');

    this.repo.remove(user);
  }
}
