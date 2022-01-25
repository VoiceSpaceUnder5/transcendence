import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChannelInput {
  @Field()
  name: string;

  @Field(() => String)
  typeId: string;

  @Field(() => String, { nullable: true })
  password?: string;
}
