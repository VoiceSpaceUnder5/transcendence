import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement } from './achievement.entity';
import { CreateAchievementInput } from './dto/create-achievement.input';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
  ) {}

  getAchievementsByUserId(userId: number): Promise<Achievement[]> {
    return this.achievementRepository.find({ userId });
  }

  getAchievement(createAchievement: CreateAchievementInput) {
    return this.achievementRepository.findOneOrFail(createAchievement);
  }

  async createAchievement(
    createAchievementInput: CreateAchievementInput,
  ): Promise<Achievement> {
    try {
      return await this.achievementRepository.save(createAchievementInput);
    } catch (e) {
      console.log('로그인 업적 중복');
    }
    // } catch (e) {
    //   return await this.getAchievement(createAchievementInput);
    // }
  }
}
