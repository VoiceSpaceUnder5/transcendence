import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeModule } from 'src/code/code.module';
import { Relation } from './relation.entity';
import { RelationResolver } from './relation.resolver';
import { RelationService } from './relation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Relation]), CodeModule],
  exports: [TypeOrmModule, RelationService],
  providers: [RelationResolver, RelationService],
})
export class RelationModule {}
