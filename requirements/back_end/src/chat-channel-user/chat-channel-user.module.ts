import { forwardRef, Module } from '@nestjs/common';
import { ChatChannelUserService } from './chat-channel-user.service';
import { ChatChannelUserResolver } from './chat-channel-user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatChannelUser } from './chat-channel-user.entity';
import { UsersModule } from 'src/users/users.module';
import { ChatChannelsModule } from 'src/chat-channels/chat-channels.module';
import { CodeModule } from 'src/code/code.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatChannelUser]),
    forwardRef(() => UsersModule),
    forwardRef(() => ChatChannelsModule),
    CodeModule,
  ],
  exports: [TypeOrmModule, ChatChannelUserService],
  providers: [ChatChannelUserService, ChatChannelUserResolver],
})
export class ChatChannelUserModule {}
