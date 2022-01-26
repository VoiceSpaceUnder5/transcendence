import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DuplicateLoginGuard } from 'src/auth/guard/duplicateLogin.guard';
import { SiteManagerGuard } from 'src/auth/guard/role.guard';
import { ChannelUser } from 'src/chat-channel-user/channel-user.entity';
import { ChannelUserService } from 'src/chat-channel-user/channel-user.service';
import { Code } from 'src/code/code.entity';
import { Message } from 'src/message/message.entity';
import { MessageService } from 'src/message/message.service';
import { Channel } from './channel.entity';
import { ChannelService } from './channel.service';
import { CreateChannelInput } from './inputs/create-channel.input';
import { JoinChannelInput } from './inputs/join-channel.input';
import { LeaveChannelInput } from './inputs/leave-channel.input';
import { UpdateChannelInput } from './inputs/update-channel.input';

@Resolver((type) => Channel)
@UseGuards(DuplicateLoginGuard)
export class ChannelResolver {
  constructor(
    private readonly channelService: ChannelService,
    private readonly channelUserService: ChannelUserService,
    private readonly messageService: MessageService,
  ) {}

  @Query(() => [Channel], { name: 'getChannels', nullable: 'items' })
  async getChannels() {
    return this.channelService.findChannels();
  }

  @Query(() => [Channel], { name: 'getChannelsByUserId', nullable: 'items' })
  async getChannelsByUserId(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('joined', { type: () => Boolean }) joined: boolean,
  ) {
    return await this.channelService.findChannelsByUserId(userId, joined);
  }

  @Query(() => Channel, { name: 'getChannelById' })
  async getChannelById(
    @Args('channelId', { type: () => ID }) channelId: string,
  ) {
    return await this.channelService.findChannelById(channelId);
  }

  @Query(() => [Channel], { name: 'getChannelsByIds' })
  async getChannelsByIds(
    @Args('ids', { type: () => [ID] }) channelIds: string[],
  ) {
    return await this.channelService.findChannelsByIds(channelIds);
  }
  
  //UserId validation check 필요
  @Mutation(() => Channel, { name: 'createChannel' })
  async createChannel(
    @Args('userId', { type: () => Int }) user_id: number,
    @Args('createChannelInput') createChannelInput: CreateChannelInput,
  ) {
    const newChannel = await this.channelService.createChannel(
      createChannelInput,
    );
    const newchannelUserInput = {
      userId: user_id,
      channelId: newChannel.id,
      roleId: 'UR0',
    }; // 'UR0' = 소유자}
    await this.channelUserService.create(newchannelUserInput);
    return newChannel;
  }

  //여기는 권한 가드 만들어야할듯 (해당 방을 업데이트할 수 있는 권한이 있는지)
  @Mutation(() => Channel, { name: 'updateChannel' })
  async updateChannel(
    @Args('channelId', { type: () => ID }) channelId: string,
    @Args('updateChannelInput') updateChannelInput: UpdateChannelInput,
  ) {
    return await this.channelService.updateChannel(
      channelId,
      updateChannelInput,
    );
  }

  @UseGuards(SiteManagerGuard)
  @Mutation(() => Int, { name: 'deleteChannels' })
  async deleteChannels(
    @Args('ids', { type: () => [ID] }) channelIds: string[],
  ) {
    const affects = (await this.channelService.deleteChannels(channelIds))
      .affected;
    return affects;
  }

  //채팅방에 들어가는 뮤테이션, 들어가려고 하는 유저 id, 채팅방 id, 비밀번호 있으면 비밀번호 확인
  @Mutation(() => Boolean, { name: 'joinChannel' })
  async joinChannel(
    @Args('joinChannelInput')
    joinChannelInput: JoinChannelInput,
  ) {
    return await this.channelService.joinChannel(joinChannelInput);
  }

  @Mutation(() => Boolean, { name: 'leaveChannel' })
  async leaveChannel(
    @Args('leaveChannelInput') leaveChannelInput: LeaveChannelInput,
  ) {
    if (await this.channelUserService.delete(leaveChannelInput)) return true;
    return false;
  }

  @Mutation(() => Channel, { name: 'joinDirectChannel' })
  async joinDirectChannel(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('otherUserId', { type: () => Int }) otherUserId: number,
  ) {
    return this.channelService.joinDirectChannel(userId, otherUserId);
  }

  @ResolveField(() => Code) // 이렇게 하면 이렇게 쓸 수 있다.
  async type(@Parent() channel: Channel) {
    return await this.channelService.getType(channel.typeId);
  }

  @ResolveField(() => [ChannelUser])
  async channelUsers(@Parent() channel: Channel) {
    return await this.channelUserService.findByChannelId(channel.id);
  }

  @ResolveField(() => [Message])
  async messages(@Parent() channel: Channel): Promise<Message[]> {
    const channelId = channel.id;

    return await this.messageService.findByChannelId(channelId);
  }
}
