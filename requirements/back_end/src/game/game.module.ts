import { Module } from '@nestjs/common';
import { RecordModule } from 'src/record/record.module';
import { UserModule } from 'src/users/user.module';
import { GameGateway } from './game.gateway';

@Module({
  imports: [RecordModule, UserModule],
  providers: [GameGateway],
})
export class GameModule {}
