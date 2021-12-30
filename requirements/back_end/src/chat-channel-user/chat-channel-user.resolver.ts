import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ChatChannel } from 'src/chat-channels/chat-channel.entity';
import { ChatChannelsService } from 'src/chat-channels/chat-channels.service';
import { Code } from 'src/code/code.entity';
import { CodeService } from 'src/code/code.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { ChatChannelUser } from './chat-channel-user.entity';
import { ChatChannelUserService } from './chat-channel-user.service';
import { CreateChatChannelUserInput } from './inputs/create-chat-channel-user.input';

@Resolver(() => ChatChannelUser)
export class ChatChannelUserResolver {
  constructor(
    private readonly chatChannelUserService: ChatChannelUserService,
    private readonly userService: UsersService,
    private readonly codeService: CodeService,
    private readonly chatChannelService: ChatChannelsService,
  ) {}

  @Query(() => [ChatChannelUser], {
    name: 'chatChannelUsers',
    nullable: 'items',
  })
  async chatChannelUsers() {
    return this.chatChannelUserService.findAll();
  }

  @Query(() => [ChatChannelUser], {
    name: 'chatChannelUsersByChannelId',
    nullable: 'items',
  })
  async chatChannelUsersByChannelId(@Args('channelId') channelId: number) {
    return this.chatChannelUserService.findByChannelId(channelId);
  }

  @Mutation(() => ChatChannelUser, { name: 'createChatChannelUser' })
  async createChatChannelUser(
    @Args('createChatChannelUserInput')
    createChatChannelUserInput: CreateChatChannelUserInput,
  ) {
    return await this.chatChannelUserService.create(createChatChannelUserInput);
  }

  @ResolveField(() => Code)
  async role(@Parent() chatChannelUser: ChatChannelUser) {
    return await this.codeService.findCodebyId(chatChannelUser.roleId);
  }

  // @ResolveField(() => User)
  // async user(@Parent() chatChannelUser: ChatChannelUser) {
  //   return await this.userService.findUserById(chatChannelUser.userId);
  // }

  // @ResolveField(() => ChatChannel)
  // async chatChannel(@Parent() chatChannelUser: ChatChannelUser) {
  //   // return 'Chat Channel user';
  //   return await this.chatChannelService.findChannelById(
  //     chatChannelUser.chatChannelId,
  //   );
  // }
}
