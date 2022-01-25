import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { Code } from './code.entity';
import { CodeService } from './code.service';
import { CreateCodeInput } from './inputs/create-code.input';

@Resolver()
@UseGuards(AccessGuard)
export class CodeResolver {
  constructor(private readonly codeService: CodeService) {}

  @Query(() => [Code], { name: 'getCodes', nullable: 'items' })
  async getCodes() {
    return this.codeService.findCodes();
  }

  @Query(() => Code, { name: 'getCodeById' })
  async getCodeById(@Args('id', { type: () => String }) id: string) {
    return await this.codeService.findCodebyId(id);
  }

  @Query(() => [Code])
  async getCodesByIds(
    @Args('ids', { type: () => [String] }) codeIds: string[],
  ) {
    return this.codeService.findCodesByIds(codeIds);
  }

  @Mutation(() => Code)
  async createCode(@Args('createCodeInput') createCodeInput: CreateCodeInput) {
    return this.codeService.create(createCodeInput);
  }
}
