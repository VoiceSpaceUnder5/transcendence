import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatChannelUserService } from 'src/chat-channel-user/chat-channel-user.service';
import { CodeService } from 'src/code/code.service';
import { isValidPassword, transformPwToHash } from 'src/utils/hashing';
import { Repository } from 'typeorm';
import { ChatChannel } from './chat-channel.entity';
import { CreateChannelInput } from './inputs/create-channel.input';
import { JoinChannelInput } from './inputs/join-channel.input';

@Injectable()
export class ChatChannelsService {
  constructor(
    @InjectRepository(ChatChannel)
    private chatChannelRepository: Repository<ChatChannel>,
    private codeService: CodeService,
    private chatChannelUserService: ChatChannelUserService,
  ) {}

  findChannels(): Promise<ChatChannel[]> {
    return this.chatChannelRepository.find();
  }

  findChannelById(channelId: number): Promise<ChatChannel> {
    return this.chatChannelRepository.findOneOrFail(channelId);
  }

  findChannelsByIds(channelsId: number[]): Promise<ChatChannel[]> {
    return this.chatChannelRepository.findByIds(channelsId);
  }

  async createChannel(
    createChannelInput: CreateChannelInput,
  ): Promise<ChatChannel> {
    if (createChannelInput.password)
      createChannelInput.password = await transformPwToHash(
        createChannelInput.password,
      );
    return await this.chatChannelRepository.save(createChannelInput);
  }

  async updateChannel(
    channelId: number,
    updateChannelInput: CreateChannelInput,
  ): Promise<ChatChannel> {
    if (updateChannelInput.password)
      updateChannelInput.password = await transformPwToHash(
        updateChannelInput.password,
      );
    await this.chatChannelRepository.update(channelId, updateChannelInput);
    return await this.chatChannelRepository.findOneOrFail(channelId);
  }

  async joinChannel(joinChannelInput: JoinChannelInput): Promise<boolean> {
    const { channelId, password, userId } = joinChannelInput;

    const channel = await this.findChannelById(channelId);
    if (
      channel.typeId === 'CT1' && // 비밀번호 방이면
      !(await isValidPassword(password, channel.password))
    ) {
      return false;
    }
    const newChatChannelUserInput = {
      userId: userId,
      chatChannelId: channelId,
      roleId: 'UR2',
    }; // 'UR2' = 참여자
    await this.chatChannelUserService.create(newChatChannelUserInput);
    return true;
  }

  getType(typeId: string) {
    return this.codeService.findCodebyId(typeId);
  }
}
