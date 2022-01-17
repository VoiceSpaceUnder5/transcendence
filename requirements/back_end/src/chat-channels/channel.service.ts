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
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
    private codeService: CodeService,
    private channelUserService: ChannelUserService,
    private userService: UsersService,
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
    const id = uuidv4();
    return await this.channelRepository.save({ id, ...createChannelInput });
  }

  async joinDirectChannel(userId: number, otherUserId: number) {
    const firstUserId = Math.min(userId, otherUserId);
    const secondUserId = Math.max(userId, otherUserId);
    const channelId = `${firstUserId}-${secondUserId}`;
    const firstUser = await this.userService.findUserById(firstUserId);
    const secondUser = await this.userService.findUserById(secondUserId);

    const channelInput = {
      id: channelId,
      name: `${firstUser.name}-${secondUser.name}`,
      typeId: 'CT0',
    };
    const channel = await this.channelRepository.save(channelInput);
    const firstUserInput = {
      userId: firstUserId,
      channelId: channel.id,
      roleId: 'UR2',
    }; // 'UR2' = 참여자}
    const secondUserInput = {
      userId: secondUserId,
      channelId: channel.id,
      roleId: 'UR2',
    }; // 'UR2' = 참여자}
    await this.channelUserService.create(firstUserInput);
    await this.channelUserService.create(secondUserInput);
    return channel;
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
