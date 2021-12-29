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

@Resolver((type) => ChatChannel)
export class ChatChannelsResolver {
  constructor(
    private readonly chatChannelsService: ChatChannelsService,
    private readonly chatChannelUserService: ChatChannelUserService,
    private readonly messageService: MessageService,
  ) {}

  @Query(() => [ChatChannel], { name: 'chatChannels', nullable: 'items' })
  async chatChannels() {
    return this.chatChannelsService.findChannels();
  }

  @Query(() => ChatChannel, { name: 'getChannelById' })
  async getChannelById(
    @Args('channelId', { type: () => Int }) channelId: number,
  ) {
    return this.chatChannelsService.findChannelById(channelId);
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

  //여기는 권한 가드 만들어야할듯
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
