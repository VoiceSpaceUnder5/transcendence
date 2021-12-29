import { Field, InputType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateChannelInput {
  @Field()
  name: string;

  @Field(() => String)
  typeId: string;

  @Field(() => String, { nullable: true })
  password?: string;
}
