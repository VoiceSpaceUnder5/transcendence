import { forwardRef, Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelResolver } from './channel.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './channel.entity';
import { CodeModule } from 'src/code/code.module';
import { channelUserModule } from 'src/chat-channel-user/channel-user.module';
import { MessageModule } from 'src/message/message.module';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Channel]),
    CodeModule,
    forwardRef(() => channelUserModule),
    forwardRef(() => MessageModule),
    forwardRef(() => UserModule),
  ],
  exports: [TypeOrmModule, ChannelService],
  providers: [ChannelService, ChannelResolver],
})
export class ChannelsModule {}
