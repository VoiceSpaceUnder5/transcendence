import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Code } from 'src/code/code.entity';
import { CodeService } from 'src/code/code.service';
import { Achievement } from './achievement.entity';
import { AchievementService } from './achievement.service';
import { CreateAchievementInput } from './dto/create-achievement.input';

@Resolver((of) => Achievement)
export class AchievementResolver {
  constructor(
    private readonly achievementService: AchievementService,
    private readonly codeService: CodeService,
  ) {}

  @Query(() => [Achievement])
  async getAchievementsByUserId(
    @Args('userId') userId: number,
  ): Promise<Achievement[]> {
    return await this.achievementService.getAchievementsByUserId(userId);
  }

  @Mutation(() => Achievement)
  async createAchievement(
    @Args('createAchievementInput') createAchievementInput: CreateAchievementInput,
  ): Promise<Achievement> {
    return await this.achievementService.createAchievement(
      createAchievementInput,
    );
  }

  @ResolveField(() => Code)
  async type(@Parent() achievement: Achievement): Promise<Code> {
    return this.codeService.findCodebyId(achievement.typeId);
  }
}
