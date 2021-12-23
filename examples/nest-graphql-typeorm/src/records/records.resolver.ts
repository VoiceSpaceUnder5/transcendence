import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRecordInput } from "./createRecordInput.input";
import { Record } from "./records.entity";
import { RecordsService } from "./records.service";

@Resolver(() => Record)
export class RecordsResolver {
  constructor(private readonly recordsService: RecordsService) {}

  @Query(() => [Record], { name: 'records' })
  async getRecordsByUserId(@Args('id', { type: () => Int }) id: number) {
    return this.recordsService.findRecordsByUserId(id);
  }

  @Mutation(() => Record)
  async createRecord(@Args('input') input: CreateRecordInput) {
    return await this.recordsService.create(input);
  }
}