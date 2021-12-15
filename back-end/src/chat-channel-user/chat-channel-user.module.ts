import { Module } from '@nestjs/common';
import { ChatChannelUserService } from './chat-channel-user.service';
import { ChatChannelUserResolver } from './chat-channel-user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatChannelUser } from './chat-channel-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatChannelUser])],
  exports: [TypeOrmModule],
  providers: [ChatChannelUserService, ChatChannelUserResolver],
})
export class ChatChannelUserModule {}
