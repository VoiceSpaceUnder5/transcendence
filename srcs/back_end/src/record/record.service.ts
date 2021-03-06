import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecordInput } from './dto/create-record.input';
import { Record } from './record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  getRecords(): Promise<Record[]> {
    return this.recordRepository.find();
  }

  getRecordByUserId(userId: number): Promise<Record[]> {
    return this.recordRepository.find({
      where: [{ leftUserId: userId }, { rightUserId: userId }],
    });
  }
  createRecord(createRecordInput: CreateRecordInput): Promise<Record> {
    return this.recordRepository.save(createRecordInput);
  }
}
