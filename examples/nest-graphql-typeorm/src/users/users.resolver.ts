import { Resolver, Query, Args, Int, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { CreateUserInput } from './createUserInput.input';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findById(id);
  }

  @Query(() => [User], { name: 'users' })
  async getUsersByNickname() {
    return this.userService.findUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @ResolveField()
  async records(@Parent() user: User) {
    return await this.userService.getRecords(user.id);
  }
}
