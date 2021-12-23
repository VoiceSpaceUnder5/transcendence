import { Field, ObjectType } from '@nestjs/graphql';
import { ChatChannel } from 'src/chat-channels/chat-channel.entity';
import { DefaultEntity } from 'src/default.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Message extends DefaultEntity {
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @Field(() => ChatChannel)
  @ManyToOne(() => ChatChannel, (channel) => channel.messages)
  chat_channel: ChatChannel;

  @Field(() => String)
  @Column({ type: 'varchar', length: '255' })
  data: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: '20' })
  data_type: string;
}
