import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  profile_image?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
