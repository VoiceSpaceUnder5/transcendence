import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ChatChannelUser } from 'src/chat-channel-user/chat-channel-user.entity';
import { Code } from 'src/code/code.entity';
import { DefaultEntity } from 'src/default.entity';
import { Message } from 'src/message/message.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType({ description: 'Chatting Channel Data' })
@Entity()
export class ChatChannel extends DefaultEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: 'varchar', length: 25, nullable: true })
  password?: string;

  @Field((type) => Code)
  @ManyToOne((type) => Code, (code) => code.id)
  type: Code;

  @Field((type) => String)
  @Column({ type: 'varchar', length: 10 })
  typeId: string;

  @Field(() => [ChatChannelUser], { nullable: 'items' })
  @OneToMany(
    () => ChatChannelUser,
    (chatChannelUser) => chatChannelUser.chatChannel,
  )
  chatChannelUsers: ChatChannelUser[];

  @Field(() => [Message], { nullable: 'items' })
  @OneToMany(() => Message, (message) => message.chatChannel)
  messages: Message[];
}
