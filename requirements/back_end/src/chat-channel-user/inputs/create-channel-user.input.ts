import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateChannelUserInput {
  @Field((type) => Int)
  channelId: number;

  @Field((type) => Int)
  userId: number;

  @Field((type) => String)
  roleId: string;
}
