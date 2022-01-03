import {
  Args,
  Int,
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
import { UsersService } from 'src/users/users.service';
import { DeleteResult } from 'typeorm';
import { ChatChannelUser } from './chat-channel-user.entity';
import { ChatChannelUserService } from './chat-channel-user.service';
import { CreateChatChannelUserInput } from './inputs/create-chat-channel-user.input';
import { DeleteChatChannelUserInput } from './inputs/delete-chat-channel-user.input';

@Resolver(() => ChatChannelUser)
export class ChatChannelUserResolver {
  constructor(
    private readonly chatChannelUserService: ChatChannelUserService,
    private readonly userService: UsersService,
    private readonly codeService: CodeService,
    private readonly chatChannelService: ChatChannelsService,
  ) {}

  @Query(() => [ChatChannelUser], {
    name: 'getChatChannelUsers',
    nullable: 'items',
  })
  async getChatChannelUsers() {
    return this.chatChannelUserService.findAll();
  }

  @Query(() => [ChatChannelUser], {
    name: 'getChatChannelUsersByChannelId',
  })
  async getChatChannelUsersByChannelId(
    @Args('channelId', { type: () => Int }) channelId: number,
  ) {
    return this.chatChannelUserService.findByChannelId(channelId);
  }

  @Mutation(() => ChatChannelUser, { name: 'createChatChannelUser' })
  async createChatChannelUser(
    @Args('createChatChannelUserInput')
    createChatChannelUserInput: CreateChatChannelUserInput,
  ) {
    // 유효성검사 어떡하지?
    // 내가 이미 방에 들어가있는데 또 들어가려고 하면??
    return await this.chatChannelUserService.create(createChatChannelUserInput);
  }

  @Mutation(() => Boolean)
  async deleteChatChannelUser(
    @Args('deleteChatChannelUserInput')
    deleteChatChannelUser: DeleteChatChannelUserInput,
  ) {
    return await this.chatChannelUserService.delete(deleteChatChannelUser);
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
