import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { CodeService } from 'src/code/code.service';
import { Code } from 'typeorm';
import { CreateRecordInput } from './dto/create-record.input';
import { Record } from './record.entity';
import { RecordService } from './record.service';

@Resolver((of) => Record)
@UseGuards(AccessGuard)
export class RecordResolver {
  constructor(
    private readonly recordService: RecordService,
    private readonly codeService: CodeService,
  ) {}

  @Query(() => [Record], { name: 'getRecords', nullable: 'items' })
  async getRecords() {
    return this.recordService.getRecords();
  }

  @Mutation(() => Record)
  async createRecord(
    @Args('createRecordInput') createRecordInput: CreateRecordInput,
  ) {
    return this.recordService.createRecord(createRecordInput);
  }

  @ResolveField(() => Code)
  async result(@Parent() record: Record) {
    return this.codeService.findCodebyId(record.resultId);
  }

  @ResolveField(() => Code)
  async type(@Parent() record: Record) {
    return this.codeService.findCodebyId(record.typeId);
  }

  @ResolveField(() => Code)
  async mode(@Parent() record: Record) {
    return this.codeService.findCodebyId(record.modeId);
  }
}
