import { Field, InputType } from '@nestjs/graphql';
import { Code } from 'src/code/code.entity';

@InputType()
export class CreateUserInput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field(() => String, { description: 'profile_image_url', nullable: true })
  email?: string;

  @Field(() => String, { description: 'profile_image_url', nullable: true })
  profile_image?: string;
}
