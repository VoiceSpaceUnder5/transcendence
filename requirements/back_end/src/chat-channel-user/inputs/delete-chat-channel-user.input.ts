import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DeleteChatChannelUserInput {
  @Field((type) => Int)
  chatChannelId: number;

  @Field((type) => Int)
  userId: number;
}
