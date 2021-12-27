import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from './code.entity';
import { CodeResolver } from './code.resolver';
import { CodeService } from './code.service';

@Module({
  imports: [TypeOrmModule.forFeature([Code])],
  exports: [TypeOrmModule, CodeService],
  providers: [CodeResolver, CodeService],
})
export class CodeModule {}
