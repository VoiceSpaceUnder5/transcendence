import { Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [MessageModule],
  providers: [ChatGateway],
})
export class ChatModule {}
