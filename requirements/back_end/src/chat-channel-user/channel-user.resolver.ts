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
import { GqlJwtAccessGuard } from 'src/auth/guard/gql-jwt.guard';
import { Code } from 'src/code/code.entity';
import { CodeService } from 'src/code/code.service';
import { ChannelUser } from './channel-user.entity';
import { ChannelUserService } from './channel-user.service';
import { CreateChannelUserInput } from './inputs/create-channel-user.input';

@Resolver(() => ChannelUser)
@UseGuards(GqlJwtAccessGuard)
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

  @Query(() => [ChannelUser], {
    name: 'getChannelUsersByChannelId',
  })
  async getChannelUsersByChannelId(
    @Args('channelId', { type: () => ID }) channelId: string,
  ) {
    return this.channelUserService.findByChannelId(channelId);
  }

  // @Mutation(() => ChannelUser, { name: 'createChannelUser' })
  // async createChannelUser(
  //   @Args('createchannelUserInput')
  //   createchannelUserInput: CreatechannelUserInput,
  // ) {
  //   // 유효성검사 어떡하지?
  //   // 내가 이미 방에 들어가있는데 또 들어가려고 하면??
  //   return await this.channelUserService.create(createchannelUserInput);
  // }

  @Mutation(() => ChannelUser, { name: 'updateChannelUser' })
  async updateChannelUser(
    @Args('updateChannelUserInput')
    updateChannelUserInput: CreateChannelUserInput,
  ) {
    return await this.channelUserService.update(updateChannelUserInput);
  }

  // @Mutation(() => Boolean)
  // async deleteChannelUser(
  //   @Args('deletechannelUserInput')
  //   deletechannelUser: DeletechannelUserInput,
  // ) {
  //   return await this.channelUserService.delete(deleteChannelUser);
  // }

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
