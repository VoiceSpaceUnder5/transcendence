import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ChannelUser } from 'src/chat-channel-user/channel-user.entity';
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
export class Channel extends DefaultEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: 'varchar', length: 200, nullable: true })
  password?: string;

  @Field((type) => Code)
  @ManyToOne((type) => Code, (code) => code.id)
  type: Code;

  @Field((type) => String)
  @Column({ type: 'varchar', length: 10 })
  typeId: string;

  @Field(() => [ChannelUser], { nullable: 'items' })
  @OneToMany(() => ChannelUser, (channelUser) => channelUser.channel)
  channelUsers: ChannelUser[];

  @Field(() => [Message], { nullable: 'items' })
  @OneToMany(() => Message, (message) => message.channel)
  messages: Message[];
}
