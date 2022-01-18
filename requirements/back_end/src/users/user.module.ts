import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { channelUserModule } from 'src/chat-channel-user/channel-user.module';
import { CodeModule } from 'src/code/code.module';
import { EncryptModule } from 'src/encrypt/encrypt.module';
import { ImageModule } from 'src/image/image.module';
import { RecordModule } from 'src/record/record.module';
import { RelationModule } from 'src/relation/relation.module';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UsersService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => channelUserModule),
    CodeModule,
    RelationModule,
    ImageModule,
    RecordModule,
    EncryptModule,
  ],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersService, UserResolver],
})
export class UserModule {}
