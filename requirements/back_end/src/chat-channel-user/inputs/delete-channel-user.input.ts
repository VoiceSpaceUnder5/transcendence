import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DeleteChannelUserInput {
  @Field((type) => Int)
  channelId: number;

  @Field((type) => Int)
  userId: number;
}
