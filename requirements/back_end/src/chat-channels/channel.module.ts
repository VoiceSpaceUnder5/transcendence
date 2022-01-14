import { forwardRef, Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelResolver } from './channel.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './channel.entity';
import { CodeModule } from 'src/code/code.module';
import { channelUserModule } from 'src/chat-channel-user/channel-user.module';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Channel]),
    CodeModule,
    forwardRef(() => channelUserModule),
    forwardRef(() => MessageModule),
  ],
  exports: [TypeOrmModule, ChannelService],
  providers: [ChannelService, ChannelResolver],
})
export class channelsModule {}
