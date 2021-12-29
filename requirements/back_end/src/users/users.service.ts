import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeService } from 'src/code/code.service';
import { Like, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.update';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private codeService: CodeService,
  ) {}

  findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  findUserById(id: number): Promise<User> {
    console.log('Step5 id: ', id);
    return this.userRepository.findOneOrFail(id);
  }

  findUsersByName(name: string): Promise<User[]> {
    return this.userRepository.find({ name: Like(`%${name}%`) });
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    createUserInput.authorityId = 'UA1'; // 권한 설정
    return await this.userRepository.save(createUserInput);
  }

  async updateUser(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    await this.userRepository.update(id, updateUserInput);
    return await this.userRepository.findOneOrFail(id);
  }

  getAuthority(authorityId: string) {
    return this.codeService.findCodebyId(authorityId);
  }
}
