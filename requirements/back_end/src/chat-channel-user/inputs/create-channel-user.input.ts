import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateChannelUserInput {
  @Field((type) => String)
  channelId: string;

  @Field((type) => Int)
  userId: number;

  @Field((type) => String)
  roleId: string;
}
