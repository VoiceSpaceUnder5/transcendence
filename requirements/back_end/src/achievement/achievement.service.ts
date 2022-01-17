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

  createAchievement(
    createAchievementInput: CreateAchievementInput,
  ): Promise<Achievement> {
    return this.achievementRepository.save(createAchievementInput);
  }
}
