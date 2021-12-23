import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

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
}
