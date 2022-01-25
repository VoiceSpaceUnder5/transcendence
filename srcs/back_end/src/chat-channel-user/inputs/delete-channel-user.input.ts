import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DeleteChannelUserInput {
  @Field((type) => String)
  channelId: string;

  @Field((type) => Int)
  userId: number;
}
