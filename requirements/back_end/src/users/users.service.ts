import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeService } from 'src/code/code.service';
import { Like, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
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
    return this.userRepository.findOneOrFail(id);
  }

  findUsersByName(name: string): Promise<User[]> {
    return this.userRepository.find({ name: Like(`%${name}%`) });
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    // const authorityId = await this.codeService.findCodeByCode('UA1');

    const createUserDto = {
      id: createUserInput.id,
      name: createUserInput.name,
      email: createUserInput.email,
      profile_image: createUserInput.profile_image,
      // authority: authorityId,
      authorityId: 'UA1',
    };
    console.log('createUserDto : ', createUserDto);
    return await this.userRepository.save(createUserDto);
  }

  getAuthority(authorityId: string) {
    return this.codeService.findCodeByCode(authorityId);
  }
}
