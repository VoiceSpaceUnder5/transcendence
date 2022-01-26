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
import { Code } from 'src/code/code.entity';
import { CodeService } from 'src/code/code.service';
import { ChannelUser } from './channel-user.entity';
import { ChannelUserService } from './channel-user.service';
import { CreateChannelUserInput } from './inputs/create-channel-user.input';

@Resolver(() => ChannelUser)
@UseGuards(DuplicateLoginGuard)
export class ChannelUserResolver {
  constructor(
    private readonly channelUserService: ChannelUserService,
    private readonly codeService: CodeService,
  ) {}

  @Query(() => [ChannelUser], {
    name: 'getChannelUsers',
    nullable: 'items',
  })
  async getChannelUsers() {
    return this.channelUserService.findAll();
  }
  @Query(() => ChannelUser, { name: 'getChannelUserById' })
  async getChannelUserById(
    @Args('id', { type: () => Int }) channelUserId: number,
  ) {
    return await this.channelUserService.findById(channelUserId);
  }

  @Query(() => [ChannelUser], { name: 'getChannelUsersByIds' })
  async getChannelUsersByIds(
    @Args('ids', { type: () => [ID] }) channelUserIds: number[],
  ) {
    return await this.channelUserService.findByIds(channelUserIds);
  }
  
  @Query(() => [ChannelUser], {
    name: 'getChannelUsersByChannelId',
  })
  async getChannelUsersByChannelId(
    @Args('channelId', { type: () => ID }) channelId: string,
  ) {
    return this.channelUserService.findByChannelId(channelId);
  }

  @Mutation(() => ChannelUser, { name: 'updateChannelUser' })
  async updateChannelUser(
    @Args('updateChannelUserInput')
    updateChannelUserInput: CreateChannelUserInput,
  ) {
    return await this.channelUserService.update(updateChannelUserInput);
  }

  @ResolveField(() => Code)
  async role(@Parent() channelUser: ChannelUser) {
    return await this.codeService.findCodebyId(channelUser.roleId);
  }

  // @ResolveField(() => User)
  // async user(@Parent() channelUser: channelUser) {
  //   return await this.userService.findUserById(channelUser.userId);
  // }

  // @ResolveField(() => channel)
  // async channel(@Parent() channelUser: channelUser) {
  //   // return 'Chat Channel user';
  //   return await this.channelService.findChannelById(
  //     channelUser.channelId,
  //   );
  // }
}
