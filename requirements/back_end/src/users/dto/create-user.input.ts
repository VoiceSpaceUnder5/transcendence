import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  profile_image?: string;

  @Field(() => String, { defaultValue: 'UA1' })
  authorityId: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
