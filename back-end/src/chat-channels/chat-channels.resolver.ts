import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChatChannel } from './chat-channel.entity';
import { ChatChannelsService } from './chat-channels.service';
import { CreateChannelInput } from './inputs/create-channel.input';

@Resolver((type) => ChatChannel)
export class ChatChannelsResolver {
  constructor(private readonly chatChannelsService: ChatChannelsService) {}

  @Query(() => [ChatChannel], { name: 'chatChannels', nullable: 'items' })
  async chatChannels() {
    return this.chatChannelsService.findChannels();
  }

  @Mutation(() => ChatChannel, { name: 'createChannel' })
  async createChannel(
    @Args('createChannelInput') createChannelInput: CreateChannelInput,
  ) {
    return await this.chatChannelsService.createChannel(createChannelInput);
  }
}
