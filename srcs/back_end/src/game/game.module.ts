import { Module } from '@nestjs/common';
import { RecordModule } from 'src/record/record.module';
import { UserModule } from 'src/users/user.module';
import { GameGateway } from './game.gateway';
import { AchievementModule } from 'src/achievement/achievement.module';

@Module({
  imports: [RecordModule, UserModule, AchievementModule],
  providers: [GameGateway],
})
export class GameModule {}
