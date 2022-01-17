import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementResolver } from './achievement.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from './achievement.entity';
import { CodeModule } from 'src/code/code.module';

@Module({
  imports: [TypeOrmModule.forFeature([Achievement]), CodeModule],
  exports: [TypeOrmModule, AchievementService],
  providers: [AchievementService, AchievementResolver],
})
export class AchievementModule {}
