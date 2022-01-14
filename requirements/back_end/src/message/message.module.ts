import { forwardRef, Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { UsersModule } from 'src/users/user.module';
import { channelsModule } from 'src/chat-channels/channel.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    forwardRef(() => UsersModule),
    forwardRef(() => channelsModule),
  ],
  exports: [TypeOrmModule, MessageService],
  providers: [MessageService, MessageResolver],
})
export class MessageModule {}
