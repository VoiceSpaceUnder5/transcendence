import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field()
  nickname: string;

  @Field()
  password: string;
}
