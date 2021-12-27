import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeModule } from 'src/code/code.module';
import { CodeService } from 'src/code/code.service';
import { User } from './user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CodeModule],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
