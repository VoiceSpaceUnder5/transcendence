import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @IsEmail()
  @Field(() => String, { nullable: true })
  email?: string;
}
