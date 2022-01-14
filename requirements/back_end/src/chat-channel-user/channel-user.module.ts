import { forwardRef, Module } from '@nestjs/common';
import { ChannelUserService } from './channel-user.service';
import { ChannelUserResolver } from './channel-user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelUser } from './channel-user.entity';
import { UsersModule } from 'src/users/user.module';
import { channelsModule } from 'src/chat-channels/channel.module';
import { CodeModule } from 'src/code/code.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChannelUser]),
    forwardRef(() => UsersModule),
    forwardRef(() => channelsModule),
    CodeModule,
  ],
  exports: [TypeOrmModule, ChannelUserService],
  providers: [ChannelUserService, ChannelUserResolver],
})
export class channelUserModule {}
