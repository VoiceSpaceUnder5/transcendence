import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateRecordInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => Int)
  user_id: number;

  @Field(() => Int)
  movie_id: number;
}
