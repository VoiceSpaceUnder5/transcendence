import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCodeInput {
  @Field()
  group: string;

  @Field(() => String)
  code: string;

  @Field({ nullable: true })
  label_korean?: string;

  @Field({ nullable: true })
  label_english?: string;
}
