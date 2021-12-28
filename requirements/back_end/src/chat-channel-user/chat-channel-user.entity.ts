import { ObjectType, Int, Field } from '@nestjs/graphql';
import { ChatChannel } from 'src/chat-channels/chat-channel.entity';
import { Code } from 'src/code/code.entity';
import { DefaultEntity } from 'src/default.entity';
import { User } from 'src/users/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ChatChannelUser extends DefaultEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.chat_channel_users)
  user: User;

  @Field((type) => ChatChannel)
  @ManyToOne(
    (type) => ChatChannel,
    (chat_channel) => chat_channel.chat_channel_users,
  )
  chat_channel: ChatChannel;

  @Field((type) => Code)
  @ManyToOne((type) => Code, (role) => role.id)
  role: Code;
}
