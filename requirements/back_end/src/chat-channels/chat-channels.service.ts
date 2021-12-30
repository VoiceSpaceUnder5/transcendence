import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeService } from 'src/code/code.service';
import { Repository } from 'typeorm';
import { ChatChannel } from './chat-channel.entity';
import { CreateChannelInput } from './inputs/create-channel.input';

@Injectable()
export class ChatChannelsService {
  constructor(
    @InjectRepository(ChatChannel)
    private chatChannelRepository: Repository<ChatChannel>,
    private codeService: CodeService,
  ) {}

  findChannels(): Promise<ChatChannel[]> {
    return this.chatChannelRepository.find();
  }

  findChannelById(channelId: number): Promise<ChatChannel> {
    return this.chatChannelRepository.findOneOrFail(channelId);
  }

  findChannelsByUserId(channelsId: number[]): Promise<ChatChannel[]> {
    return this.chatChannelRepository.findByIds(channelsId);
  }

  async createChannel(
    createChannelInput: CreateChannelInput,
  ): Promise<ChatChannel> {
    return await this.chatChannelRepository.save(createChannelInput);
  }

  async updateChannel(
    channelId: number,
    updateChannelInput: CreateChannelInput,
  ): Promise<ChatChannel> {
    await this.chatChannelRepository.update(channelId, updateChannelInput);
    return await this.chatChannelRepository.findOneOrFail(channelId);
  }

  getType(typeId: string) {
    return this.codeService.findCodebyId(typeId);
  }
}
