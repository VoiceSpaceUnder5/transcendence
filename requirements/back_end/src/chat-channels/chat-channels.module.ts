import { Module } from '@nestjs/common';
import { ChatChannelsService } from './chat-channels.service';
import { ChatChannelsResolver } from './chat-channels.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatChannel } from './chat-channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatChannel])],
  exports: [TypeOrmModule],
  providers: [ChatChannelsService, ChatChannelsResolver],
})
export class ChatChannelsModule {}
