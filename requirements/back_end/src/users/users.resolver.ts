import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlJwtAccessGuard } from 'src/auth/guard/gql-jwt.guard';
import { ChatChannelUser } from 'src/chat-channel-user/chat-channel-user.entity';
import { ChatChannelUserService } from 'src/chat-channel-user/chat-channel-user.service';
import { Relation } from 'src/relation/relation.entity';
import { RelationService } from 'src/relation/relation.service';
import { Code } from '../code/code.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.update';
import { User } from './user.entity';
import { GetUser } from './users.decorator';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly chatChannelUserService: ChatChannelUserService,
    private readonly relationService: RelationService,
  ) {}

  //@GetUser 가드를 통과해서 내려온 컨텍스트에서 user 추출
  @UseGuards(GqlJwtAccessGuard)
  @Query(() => User, { name: 'getMe' })
  async getMe(@GetUser() user: User) {
    return user;
  }

  @Query(() => [User], { name: 'getUsers', nullable: 'items' })
  async getUsers() {
    return this.usersService.findUsers();
  }

  @Query(() => User)
  async getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findUserById(id);
  }

  @Query(() => [User])
  async getUsersByIds(@Args('ids', { type: () => [Int] }) userIds: number[]) {
    return this.usersService.findUsersByIds(userIds);
  }

  @Query(() => [User])
  async getUsersByName(
    @Args('user_name', { type: () => String }) name: string,
  ) {
    return this.usersService.findUsersByName(name);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('user_id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  //🔴 여기 관리자 권한 유저 가드 붙여야함.
  @Mutation(() => User, { name: 'updateUserAuthority' })
  async updateUserAuthority(
    @Args('id', { type: () => Int }) id: number,
    @Args('authorityId') authorityId: string,
  ) {
    return this.usersService.updateUserAuthority(id, authorityId);
  }

  @ResolveField(() => Code)
  authority(@Parent() user: User) {
    return this.usersService.getAuthority(user.authorityId);
  }

  @ResolveField(() => [ChatChannelUser])
  chatChannelUsers(@Parent() user: User): Promise<ChatChannelUser[]> {
    return this.chatChannelUserService.findByUserId(user.id);
  }

  @ResolveField(() => [Relation])
  async relations(
    @Parent() user: User,
    @Args('typeId') typeId: string,
  ): Promise<Relation[]> {
    return this.relationService.getRelationsByUserIdTreatAsFirst(
      user.id,
      typeId,
    );
  }
}
