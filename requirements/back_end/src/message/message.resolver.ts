import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ChatChannelsService } from 'src/chat-channels/chat-channels.service';
import { UsersService } from 'src/users/users.service';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './message.entity';
import { MessageService } from './message.service';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UsersService,
    private readonly chatChannelsService: ChatChannelsService,
  ) {}

  @Mutation(() => Message, { name: 'createMessage' })
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    return await this.messageService.create(createMessageInput);
  }
}
