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
import { Code } from '../code/code.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.update';
import { User } from './user.entity';
import { GetUser } from './users.decorator';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  //@GetUser 가드를 통과해서 내려온 컨텍스트에서 user 추출
  @UseGuards(GqlJwtAccessGuard)
  @Query(() => User, { name: 'me' })
  async getMe(@GetUser() user: User) {
    console.log('Step4', user);
    return user;
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  async users() {
    return this.usersService.findUsers();
  }

  @Query(() => User)
  async getUserById(@Args('user_id', { type: () => Int }) id: number) {
    const result = await this.usersService.findUserById(id);
    return result;
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
    return this.usersService.updateUser(id, updateUserInput);
  }

  @ResolveField(() => Code)
  authority(@Parent() user: User) {
    return this.usersService.getAuthority(user.authorityId);
  }
}
