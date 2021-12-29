import { forwardRef, Module } from '@nestjs/common';
import { ChatChannelsService } from './chat-channels.service';
import { ChatChannelsResolver } from './chat-channels.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatChannel } from './chat-channel.entity';
import { CodeModule } from 'src/code/code.module';
import { ChatChannelUserModule } from 'src/chat-channel-user/chat-channel-user.module';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatChannel]),
    CodeModule,
    forwardRef(() => ChatChannelUserModule),
    forwardRef(() => MessageModule),
  ],
  exports: [TypeOrmModule, ChatChannelsService],
  providers: [ChatChannelsService, ChatChannelsResolver],
})
export class ChatChannelsModule {}
