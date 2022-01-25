import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field()
  channelId: string;

  @Field()
  userId: number;

  @Field()
  textMessage: string;
}
