import { Field, InputType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateChannelInput {
  @Field()
  name: string;

  @Field(() => String)
  code_type: string;

  @Field(() => String, { nullable: true })
  password?: string;
}
