import { Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { MessageService } from 'src/message/message.service';

@Module({
  imports: [MessageModule],
  providers: [],
})
export class ChatModule {}

class MessageIo {
  constructor(private messageService: MessageService) {
		
	}
}
