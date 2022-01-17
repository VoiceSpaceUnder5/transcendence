import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelUserService } from 'src/chat-channel-user/channel-user.service';
import { CodeService } from 'src/code/code.service';
import { isValidPassword, transformPwToHash } from 'src/utils/hashing';
import { Repository } from 'typeorm';
import { Channel } from './channel.entity';
import { CreateChannelInput } from './inputs/create-channel.input';
import { JoinChannelInput } from './inputs/join-channel.input';
import { UpdateChannelInput } from './inputs/update-channel.input';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
    private codeService: CodeService,
    private channelUserService: ChannelUserService,
  ) {}

  findChannels(ids?: string[]): Promise<Channel[]> {
    if (ids) return this.channelRepository.findByIds(ids);
    return this.channelRepository.find();
  }

  async findChannelsByUserId(
    userId: number,
    joined: boolean,
  ): Promise<Channel[]> {
    //joined
    const channelUsers = await this.channelUserService.findByUserId(userId);
    if (joined) {
      const joinedChannelIds = channelUsers.map((channelUser) => {
        if (channelUser.roleId !== 'UR3') return channelUser.channelId;
      });
      return this.findChannels(joinedChannelIds);
    }
    // notJoined
    else {
      const allChannels = await this.findChannels();
      const notJoinedChannel = allChannels.filter((channel) => {
        console.log(channel.id);
        const notDirectMessage = channel.typeId !== 'CT0';
        const notJoined = channelUsers.every(
          (channelUser) => channelUser.channelId !== channel.id,
        );
        return notDirectMessage && notJoined;
      });
      return notJoinedChannel;
    }
  }

  findChannelById(channelId: string): Promise<Channel> {
    return this.channelRepository.findOneOrFail(channelId);
  }

  findChannelsByIds(channelsId: string[]): Promise<Channel[]> {
    return this.channelRepository.findByIds(channelsId);
  }

  async createChannel(
    createChannelInput: CreateChannelInput,
  ): Promise<Channel> {
    if (createChannelInput.password)
      createChannelInput.password = await transformPwToHash(
        createChannelInput.password,
      );
    return await this.channelRepository.save(createChannelInput);
  }

  async updateChannel(
    channelId: number,
    updateChannelInput: UpdateChannelInput,
  ): Promise<Channel> {
    if (updateChannelInput.password)
      updateChannelInput.password = await transformPwToHash(
        updateChannelInput.password,
      );
    await this.channelRepository.update(channelId, updateChannelInput);
    return await this.channelRepository.findOneOrFail(channelId);
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
    const newchannelUserInput = {
      userId: userId,
      channelId: channelId,
      roleId: 'UR2',
    }; // 'UR2' = 참여자
    await this.channelUserService.create(newchannelUserInput);
    return true;
  }

  getType(typeId: string) {
    return this.codeService.findCodebyId(typeId);
  }
}
