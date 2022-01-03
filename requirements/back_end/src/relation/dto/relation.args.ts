import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class RelationArgs {
  @Field(() => Int, { nullable: false })
  user_first_id: number;

  @Field(() => Int, { nullable: false })
  user_second_id: number;

  @Field(() => Int, { nullable: true })
  typeId?: string;
}
