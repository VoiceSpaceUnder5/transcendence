import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JoinChannelInput {
  @Field((type) => Int)
  userId: number;

  @Field((type) => ID)
  channelId: string;

  @Field((type) => String)
  password: string;
}
