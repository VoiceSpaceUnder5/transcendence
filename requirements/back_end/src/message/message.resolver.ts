import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ChannelService } from 'src/chat-channels/channel.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/user.service';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './message.entity';
import { MessageService } from './message.service';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UsersService,
    private readonly channelService: ChannelService,
  ) {}

  @Query(() => [Message], { name: 'getMessages', nullable: 'items' })
  async messages() {
    return await this.messageService.findAll();
  }
  @Mutation(() => Message, { name: 'createMessage' })
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    return await this.messageService.create(createMessageInput);
  }

  @ResolveField(() => User)
  async user(@Parent() message: Message) {
    return await this.userService.findUserById(message.userId);
  }
}
