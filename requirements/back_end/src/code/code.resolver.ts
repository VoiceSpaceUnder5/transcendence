import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Code } from './code.entity';
import { CodeService } from './code.service';
import { CreateCodeInput } from './inputs/create-code.input';

@Resolver()
export class CodeResolver {
  constructor(private readonly codeService: CodeService) {}

  @Query(() => [Code], { name: 'codes', nullable: 'items' })
  async codes() {
    return this.codeService.findCodes();
  }

  @Query(() => Code)
  async getCodeByCode(@Args('code', { type: () => String }) code: string) {
    return await this.codeService.findCodeByCode(code);
  }

  @Mutation(() => Code)
  async createCode(@Args('createCodeInput') createCodeInput: CreateCodeInput) {
    return this.codeService.create(createCodeInput);
  }
}
