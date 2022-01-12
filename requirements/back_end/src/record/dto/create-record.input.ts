import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateRecordInput {
  @Field((type) => Int)
  leftUserId: number;

  @Field((type) => Int)
  rightUserId: number;

  @Field((type) => Int)
  leftUserScore: number;

  @Field((type) => Int)
  rightUserScore: number;

  @Field((type) => String)
  resultId: string;

  @Field((type) => String)
  typeId: string;

  @Field((type) => String)
  modeId: string;
}
