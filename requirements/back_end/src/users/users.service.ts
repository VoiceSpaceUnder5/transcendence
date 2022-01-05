import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeService } from 'src/code/code.service';
import { ImageService } from 'src/image/image.service';
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
    private imageService: ImageService,
  ) {}

  findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  findUserById(id: number): Promise<User> {
    console.log('Step5 id: ', id);
    return this.userRepository.findOneOrFail(id);
  }

  findUsersByIds(id: number[]): Promise<User[]> {
    console.log('Step5 id: ', id);
    return this.userRepository.findByIds(id);
  }

  findUsersByName(name: string): Promise<User[]> {
    return this.userRepository.find({ name: Like(`%${name}%`) });
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    createUserInput.authorityId = 'UA1'; // 권한 설정
    return await this.userRepository.save(createUserInput);
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    if (updateUserInput.profile_image_binary)
      this.updateProfileImage(id, updateUserInput.profile_image_binary);
    if (updateUserInput.description)
      this.updateDescription(id, updateUserInput.description);
    return await this.userRepository.findOneOrFail(id);
  }

  getAuthority(authorityId: string) {
    return this.codeService.findCodebyId(authorityId);
  }

  async updateDescription(id: number, description: string) {
    await this.userRepository.update(id, { description });
  }

  async updateProfileImage(id: number, imageBinary: string) {
    const uploadResponse = await this.imageService.uploadImage(imageBinary);
    if (!uploadResponse)
      console.error(
        "Can't upload image to Image Server : Maybe imageBinary is broken Or Image Server is not working",
      );
    const profile_link = {
      profile_image: uploadResponse.data.image.url,
      profile_image_thumb: uploadResponse.data.thumb.url,
      profile_image_medium: uploadResponse.data.medium.url,
    };
    await this.userRepository.update(id, profile_link);
  }
}
