import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ChatChannelUser } from 'src/chat-channel-user/chat-channel-user.entity';
import { ChatChannelUserService } from 'src/chat-channel-user/chat-channel-user.service';
import { Code } from 'src/code/code.entity';
import { Message } from 'src/message/message.entity';
import { MessageService } from 'src/message/message.service';
import { ChatChannel } from './chat-channel.entity';
import { ChatChannelsService } from './chat-channels.service';
import { CreateChannelInput } from './inputs/create-channel.input';
import { JoinChannelInput } from './inputs/join-channel.input';
import { LeaveChannelInput } from './inputs/leave-channel.input';

@Resolver((type) => ChatChannel)
export class ChatChannelsResolver {
  constructor(
    private readonly chatChannelsService: ChatChannelsService,
    private readonly chatChannelUserService: ChatChannelUserService,
    private readonly messageService: MessageService,
  ) {}

  @Query(() => [ChatChannel], { name: 'getChatChannels', nullable: 'items' })
  async getChannels() {
    return this.chatChannelsService.findChannels();
  }

  @Query(() => ChatChannel, { name: 'getChannelById' })
  async getChannelById(
    @Args('channelId', { type: () => Int }) channelId: number,
  ) {
    return await this.chatChannelsService.findChannelById(channelId);
  }

  @Query(() => [ChatChannel], {
    name: 'getParticipatingChannel',
    nullable: 'items',
  })
  async getParticipatingChannel(
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    // 내가 속한 chatChannelUsers를 가져오고, 그 채널들의 Id를 긁어옴
    const channelUsers = await this.chatChannelUserService.findByUserId(userId);
    const channelsId = channelUsers.map((channelUser) => {
      return channelUser.chatChannelId;
    });

    // 내가 있는 채널 Id를 기준으로 채널들을 긁어옴
    return this.chatChannelsService.findChannelsByIds(channelsId);
  }

  @Query(() => [ChatChannel], { name: 'getNotParticipatingChannel' })
  async getNotParticipatingChannel(
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    // 모든 chatChannelUsers를 가져오고, 그 채널들의 Id를 긁어옴
    const allChannelUsers = await this.chatChannelUserService.findAll();
    const allChannelsId = allChannelUsers.map(
      (channelUser) => channelUser.chatChannelId,
    );

    // 내가 속한 chatChannelUsers를 가져오고, 그 채널들의 Id를 긁어옴
    const meChannelUsers = await this.chatChannelUserService.findByUserId(
      userId,
    );
    const channelsId = meChannelUsers.map(
      (channelUser) => channelUser.chatChannelId,
    );

    // 모든 channelId에서 내가 속한 채널 Id를 뺌
    const channelsExceptMeId = allChannelsId.filter(
      (channelId) => !channelsId.includes(channelId),
    );

    // 내가 없는 채널 Id를 기준으로 채널들을 긁어옴
    return this.chatChannelsService.findChannelsByIds(channelsExceptMeId);
  }

  //UserId validation check 필요
  @Mutation(() => ChatChannel, { name: 'createChannel' })
  async createChannel(
    @Args('userId', { type: () => Int }) user_id: number,
    @Args('createChannelInput') createChannelInput: CreateChannelInput,
  ) {
    const newChannel = await this.chatChannelsService.createChannel(
      createChannelInput,
    );
    const newChatChannelUserInput = {
      userId: user_id,
      chatChannelId: newChannel.id,
      roleId: 'UR0',
    }; // 'UR0' = 소유자}
    await this.chatChannelUserService.create(newChatChannelUserInput);
    return newChannel;
  }

  //여기는 권한 가드 만들어야할듯 (해당 방을 업데이트할 수 있는 권한이 있는지)
  @Mutation(() => ChatChannel, { name: 'updateChannel' })
  async updateChannel(
    @Args('channelId', { type: () => Int }) channelId: number,
    @Args('updateChannelInput') updateChannelInput: CreateChannelInput,
  ) {
    return await this.chatChannelsService.updateChannel(
      channelId,
      updateChannelInput,
    );
  }

  //채팅방에 들어가는 뮤테이션, 들어가려고 하는 유저 id, 채팅방 id, 비밀번호 있으면 비밀번호 확인
  @Mutation(() => Boolean, { name: 'joinChannel' })
  async joinChannel(
    @Args('joinChannelInput')
    joinChannelInput: JoinChannelInput,
  ) {
    return await this.chatChannelsService.joinChannel(joinChannelInput);
  }

  @Mutation(() => Boolean, { name: 'leaveChannel' })
  async leaveChannel(
    @Args('leaveChannelInput') leaveChannelInput: LeaveChannelInput,
  ) {
    if (await this.chatChannelUserService.delete(leaveChannelInput))
      return true;
    return false;
  }

  @ResolveField(() => Code) // 이렇게 하면 이렇게 쓸 수 있다.
  async type(@Parent() chatChannel: ChatChannel) {
    return await this.chatChannelsService.getType(chatChannel.typeId);
  }

  @ResolveField(() => [ChatChannelUser])
  async chatChannelUsers(@Parent() chatChannel: ChatChannel) {
    return await this.chatChannelUserService.findByChannelId(chatChannel.id);
  }

  @ResolveField(() => [Message])
  async messages(@Parent() chatChannel: ChatChannel): Promise<Message[]> {
    const channelId = chatChannel.id;

    return await this.messageService.findByChannelId(channelId);
  }
}
