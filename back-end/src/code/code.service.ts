import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Code } from './code.entity';
import { CreateCodeInput } from './inputs/create-code.input';

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(Code)
    private readonly codeRepository: Repository<Code>,
  ) {}

  findCodes(): Promise<Code[]> {
    return this.codeRepository.find();
  }

  async create(createCodeInput: CreateCodeInput): Promise<Code> {
    return await this.codeRepository.save(createCodeInput);
  }
}
