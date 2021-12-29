import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateChatChannelUserInput {
  @Field((type) => Int)
  chatChannelId: number;

  @Field((type) => Int)
  userId: number;

  @Field((type) => String)
  roleId: string;
}
