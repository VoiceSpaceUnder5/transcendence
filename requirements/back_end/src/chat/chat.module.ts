import { Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { MessageService } from 'src/message/message.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [MessageModule],
  providers: [ChatGateway],
})
export class ChatModule {}

class MessageIo {
  constructor(private messageService: MessageService) {
		
	}
}
