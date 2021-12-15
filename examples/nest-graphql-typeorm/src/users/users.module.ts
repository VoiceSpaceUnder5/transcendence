import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersResolver } from './users.resolver';
import { RecordsModule } from 'src/records/records.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => RecordsModule)],
  exports: [TypeOrmModule],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
