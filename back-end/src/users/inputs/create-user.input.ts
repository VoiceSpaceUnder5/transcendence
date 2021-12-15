import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field(() => String, { description: 'profile_image_url', nullable: true })
  profile_image?: string;
}
