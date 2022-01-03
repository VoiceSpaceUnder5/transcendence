import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateRelationInput {
  @Field(() => Int, { nullable: false })
  user_first_id: number;

  @Field(() => Int, { nullable: false })
  user_second_id: number;

  @Field(() => String, { nullable: false })
  typeId: string;
}
