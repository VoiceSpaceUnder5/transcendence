import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JoinChannelInput {
  @Field((type) => Int)
  userId: number;

  @Field((type) => Int)
  channelId: string;

  @Field((type) => String)
  password: string;
}
