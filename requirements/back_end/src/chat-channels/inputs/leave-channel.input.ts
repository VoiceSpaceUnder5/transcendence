import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class LeaveChannelInput {
  @Field((type) => Int)
  userId: number;

  @Field((type) => Int)
  channelId: string;
}
