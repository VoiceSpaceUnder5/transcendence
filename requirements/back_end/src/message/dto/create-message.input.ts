import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field()
  channelId: number;

  @Field()
  userId: number;

  @Field()
  textMessage: string;
}
