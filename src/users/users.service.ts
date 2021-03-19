import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async findOneByName(username): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      select: ['id', 'username', 'password'], // в Entity закрыли password (но тут надо вытащить)
      where: { username: username },
    });
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // ? возможно здесь написать обработчик???
    const user = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.usersRepository.remove(user);
  }

  async update(id: string, updatedUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.preload({
      id: +id,
      ...updatedUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.usersRepository.save(user);
  }
}
