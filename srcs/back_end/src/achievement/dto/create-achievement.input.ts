import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAchievementInput {
  @Field((type) => Int)
  userId: number;

  @Field((type) => String)
  typeId: string;
}
