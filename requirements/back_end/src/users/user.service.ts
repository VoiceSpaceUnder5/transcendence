import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeService } from 'src/code/code.service';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { ImageService } from 'src/image/image.service';
import { Otp } from 'src/utils/otp';
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
    private encryptService: EncryptService,
  ) {}

  findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  findUserById(id: number): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  findUsersByIds(id: number[]): Promise<User[]> {
    return this.userRepository.findByIds(id);
  }

  findUsersByName(name: string): Promise<User[]> {
    return this.userRepository.find({ name: Like(`%${name}%`) });
  }

  async activateTwoFactorAuth(user: User) {
    if (user.twoFactorAuth) {
      throw new BadRequestException('이미 2FA가 활성화 되어 있습니다.');
    }
    const { otpURI, secret } = Otp.createOtp(user.name);
    const dataUri = await Otp.createQrCode(otpURI);
    user.twoFactorAuth = true;
    user.twoFactorAuthSecret = this.encryptService.encrypt(secret);
    user.twoFactorAuthImageUri = dataUri;
    await this.userRepository.update(user.id, user);
    return dataUri;
  }

  async deactivateTwoFactorAuth(user: User) {
    await this.userRepository.update(user.id, {
      twoFactorAuth: false,
      twoFactorAuthSecret: null,
      twoFactorAuthImageUri: null,
    });
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    await this.userRepository.save(createUserInput);
    return this.userRepository.findOneOrFail(createUserInput.id);
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    if (updateUserInput.profile_image_binary)
      await this.updateProfileImage(id, updateUserInput.profile_image_binary);
    if (updateUserInput.description)
      await this.updateDescription(id, updateUserInput.description);
    return await this.userRepository.findOneOrFail(id);
  }

  async updateUserConnectionStatus(id: number, connectionStatusId: string) {
    await this.userRepository.update(id, { connectionStatusId });
    return this.userRepository.findOneOrFail(id);
  }

  async updateDescription(id: number, description: string) {
    await this.userRepository.update(id, { description });
  }

  async updateProfileImage(id: number, imageBinary: string) {
    if (!imageBinary) return;
    const uploadResponse = await this.imageService.uploadImage(imageBinary);
    if (!uploadResponse) {
      console.error(
        "Can't upload image to Image Server : Maybe imageBinary is broken Or Image Server is not working",
      );
      return;
      // throw new NotAcceptableException(
      //   "Can't upload image to Image Server : Maybe imageBinary is broken Or Image Server is not working",
      // );
    }
    const profile_link = {
      profile_image: uploadResponse.data.image.url,
      profile_image_thumb:
        uploadResponse.data.thumb?.url || uploadResponse.data.image.url,
      profile_image_medium:
        uploadResponse.data.medium?.url || uploadResponse.data.image.url,
    };
    await this.userRepository.update(id, profile_link);
  }

  async updateUserAuthority(id: number, authorityId: string) {
    await this.userRepository.update(id, { authorityId });
    return this.userRepository.findOneOrFail(id);
  }
}
