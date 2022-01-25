import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelUser } from './channel-user.entity';
import { CreateChannelUserInput } from './inputs/create-channel-user.input';
import { DeleteChannelUserInput } from './inputs/delete-channel-user.input';

@Injectable()
export class ChannelUserService {
  constructor(
    @InjectRepository(ChannelUser)
    private readonly channelUserRepository: Repository<ChannelUser>,
  ) {}

  findAll(): Promise<ChannelUser[]> {
    return this.channelUserRepository.find();
  }

  findByUserId(userId: number): Promise<ChannelUser[]> {
    return this.channelUserRepository.find({ userId });
  }

  findByChannelId(channelId: string): Promise<ChannelUser[]> {
    return this.channelUserRepository.find({ channelId });
  }

  async create(
    createchannelUserInput: CreateChannelUserInput,
  ): Promise<ChannelUser> {
    return this.update(createchannelUserInput);
  }

  async update(
    updatechannelUserInput: CreateChannelUserInput,
  ): Promise<ChannelUser> {
    return this.channelUserRepository.save(updatechannelUserInput);
  }

  async delete(deletechannelUser: DeleteChannelUserInput) {
    const result = await this.channelUserRepository.delete(deletechannelUser);
    //삭제 성공 시 true, 삭제 실패 시 false
    return result.affected;
  }
}