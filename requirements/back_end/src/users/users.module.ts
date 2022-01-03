import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ChatChannelUserModule } from 'src/chat-channel-user/chat-channel-user.module';
import { CodeModule } from 'src/code/code.module';
import { RelationModule } from 'src/relation/relation.module';
import { User } from './user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ChatChannelUserModule),
    CodeModule,
    RelationModule,
  ],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
