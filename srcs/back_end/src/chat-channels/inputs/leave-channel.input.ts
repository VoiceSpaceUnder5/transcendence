import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class LeaveChannelInput {
  @Field((type) => Int)
  userId: number;

  @Field((type) => ID)
  channelId: string;
}
