import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field()
  chatChannelId: number;

  @Field()
  userId: number;

  @Field()
  textMessage: string;
}
