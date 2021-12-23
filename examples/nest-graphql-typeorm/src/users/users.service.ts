import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from 'src/records/records.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './createUserInput.input';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
  ) {}

  findById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: CreateUserInput): Promise<User> {
    return await this.userRepository.save(user);
  }

  async getRecords(id: number): Promise<Record[]> {
    return await this.recordRepository.find({ where: { user: id } });
  }
}
