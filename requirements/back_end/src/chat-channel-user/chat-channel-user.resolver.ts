import { Query, Resolver } from '@nestjs/graphql';
import { ChatChannelUser } from './chat-channel-user.entity';
import { ChatChannelUserService } from './chat-channel-user.service';

@Resolver(() => ChatChannelUser)
export class ChatChannelUserResolver {
  constructor(
    private readonly chatChannelUserService: ChatChannelUserService,
  ) {}

  @Query(() => [ChatChannelUser], {
    name: 'chatChannelUsers',
    nullable: 'items',
  })
  async chatChannelUsers() {
    return this.chatChannelUserService.findAll();
  }
}
