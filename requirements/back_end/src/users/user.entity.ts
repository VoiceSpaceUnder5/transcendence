import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ChatChannelUser } from 'src/chat-channel-user/chat-channel-user.entity';
import { Code } from 'src/code/code.entity';
import { DefaultEntity } from 'src/default.entity';
import { Message } from 'src/message/message.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@ObjectType({ description: 'User data' })
@Entity()
export class User extends DefaultEntity {
  @Field((type) => Int)
  @PrimaryColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', length: 20, unique: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  profile_image?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  description?: string;

  @Field((type) => Code)
  @ManyToOne((type) => Code, (code) => code.id)
  authority: Code;

  @Field()
  @Column()
  authorityId: string;

  @Field(() => [ChatChannelUser])
  @OneToMany(() => ChatChannelUser, (chatChannelUser) => chatChannelUser.user)
  chatChannelUsers: ChatChannelUser[];

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}
