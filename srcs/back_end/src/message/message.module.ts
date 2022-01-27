import { forwardRef, Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { UserModule } from 'src/users/user.module';
import { ChannelsModule } from 'src/chat-channels/channel.module';
import { channelUserModule } from 'src/chat-channel-user/channel-user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    forwardRef(() => UserModule),
    forwardRef(() => ChannelsModule),
    forwardRef(() => channelUserModule),
  ],
  exports: [TypeOrmModule, MessageService],
  providers: [MessageService, MessageResolver],
})
export class MessageModule {}
