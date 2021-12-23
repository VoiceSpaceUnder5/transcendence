import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatChannel } from './chat-channel.entity';
import { CreateChannelInput } from './inputs/create-channel.input';

@Injectable()
export class ChatChannelsService {
  constructor(
    @InjectRepository(ChatChannel)
    private chatChannelRepository: Repository<ChatChannel>,
  ) {}

  findChannels(): Promise<ChatChannel[]> {
    return this.chatChannelRepository.find();
  }

  async createChannel(
    createChannelInput: CreateChannelInput,
  ): Promise<ChatChannel> {
    return await this.chatChannelRepository.save(createChannelInput);
  }
}
