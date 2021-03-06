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
import { AccessGuard } from 'src/auth/guard/access.guard';
import { ChannelUser } from 'src/chat-channel-user/channel-user.entity';
import { ChannelUserService } from 'src/chat-channel-user/channel-user.service';
import { RecordService } from 'src/record/record.service';
import { Relation } from 'src/relation/relation.entity';
import { RelationService } from 'src/relation/relation.service';
import { Code } from '../code/code.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.update';
import { User } from './user.entity';
import { GetUser } from './user.decorator';
import { UsersService } from './user.service';
import { CodeService } from 'src/code/code.service';
import { Record } from 'src/record/record.entity';
import { DuplicateLoginGuard } from 'src/auth/guard/duplicateLogin.guard';
import { SiteManagerGuard } from 'src/auth/guard/role.guard';

@Resolver(() => User)
@UseGuards(DuplicateLoginGuard)
export class UserResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly codeService: CodeService,
    private readonly channelUserService: ChannelUserService,
    private readonly relationService: RelationService,
    private readonly recordService: RecordService,
  ) {}

  //@GetUser 가드를 통과해서 내려온 컨텍스트에서 user 추출
  @Query(() => User, { name: 'getMe' })
  async getMe(@GetUser() user: User) {
    return user;
  }

  @Mutation(() => String, {
    name: 'activateTwoFactorAuth',
    description: 'Return 데이터는 QRcode 이미지 데이터의 DataUri 이다',
  })
  async activateTwoFactorAuth(@GetUser() user: User) {
    return await this.usersService.activateTwoFactorAuth(user);
  }

  @Mutation(() => User, {
    name: 'deactivateTwoFactorAuth',
    description: 'Return 데이터는 QRcode 이미지 데이터의 DataUri 이다',
  })
  async deactivateTwoFactorAuth(@GetUser() user: User) {
    await this.usersService.deactivateTwoFactorAuth(user);
    return this.usersService.findUserById(user.id);
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

  @Mutation(() => User, { name: 'updateUserName' })
  async updateUserName(@GetUser() user: User, @Args('name') name: string) {
    return await this.usersService.updateUserName(user, name);
  }

  //🔴 여기 관리자 권한 유저 가드 붙여야함.
  @UseGuards(SiteManagerGuard)
  @Mutation(() => User, { name: 'updateUserAuthority' })
  async updateUserAuthority(
    @Args('id', { type: () => Int }) id: number,
    @Args('authorityId') authorityId: string,
  ) {
    return this.usersService.updateUserAuthority(id, authorityId);
  }

  @Mutation(() => User, { name: 'updateUserConnectionStatus' })
  async updateUserConnectionStatus(
    @Args('id') id: number,
    @Args('connectionStatusId') connectionStatusId: string,
  ) {
    return this.usersService.updateUserConnectionStatus(id, connectionStatusId);
  }

  //🏑 필드 리졸버
  @ResolveField(() => Code)
  authority(@Parent() user: User) {
    return this.codeService.findCodebyId(user.authorityId);
  }

  @ResolveField(() => [ChannelUser])
  channelUsers(@Parent() user: User): Promise<ChannelUser[]> {
    return this.channelUserService.findByUserId(user.id);
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

  @ResolveField(() => Code)
  connectionStatus(@Parent() user: User) {
    return this.codeService.findCodebyId(user.connectionStatusId);
  }

  @ResolveField(() => [Record])
  records(@Parent() user: User) {
    return this.recordService.getRecordByUserId(user.id);
  }
}
