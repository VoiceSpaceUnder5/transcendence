import { Module } from '@nestjs/common';
import { RecordModule } from 'src/record/record.module';
import { GameGateway } from './game.gateway';

@Module({
  imports: [RecordModule],
  providers: [GameGateway],
})
export class GameModule {}
