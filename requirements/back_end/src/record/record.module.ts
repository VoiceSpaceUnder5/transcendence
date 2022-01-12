import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordResolver } from './record.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './record.entity';
import { CodeModule } from 'src/code/code.module';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), CodeModule],
  exports: [TypeOrmModule, RecordService],
  providers: [RecordService, RecordResolver],
})
export class RecordModule {}
