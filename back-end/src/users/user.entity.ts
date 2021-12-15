import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ChatChannelUser } from 'src/chat-channel-user/chat-channel-user.entity';
import { Code } from 'src/code/code.entity';
import { DefaultEntity } from 'src/default.entity';
import { Message } from 'src/message/message.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@ObjectType({ description: 'User data' })
@Entity()
export class User extends DefaultEntity {
  @Field(() => String)
  @Column({ type: 'varchar', length: 20, unique: true })
  name: string;

  @Field(() => String, { description: 'profile_image_url', nullable: true })
  @Column({ nullable: true })
  profile_image?: string;

  @Field((type) => Code)
  @ManyToOne((type) => Code, (code) => code.code)
  authority: Code;

  @Field(() => [ChatChannelUser])
  @OneToMany(
    () => ChatChannelUser,
    (chat_channel_user) => chat_channel_user.user,
  )
  chat_channel_users: ChatChannelUser[];

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}
