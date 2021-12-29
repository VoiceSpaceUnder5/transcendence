import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { UsersModule } from 'src/users/users.module';
import { ChatChannelsModule } from 'src/chat-channels/chat-channels.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    UsersModule,
    ChatChannelsModule,
  ],
  exports: [TypeOrmModule, MessageService],
  providers: [MessageService, MessageResolver],
})
export class MessageModule {}
