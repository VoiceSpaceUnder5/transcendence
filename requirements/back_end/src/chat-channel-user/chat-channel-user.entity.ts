import { ObjectType, Int, Field } from '@nestjs/graphql';
import { ChatChannel } from 'src/chat-channels/chat-channel.entity';
import { Code } from 'src/code/code.entity';
import { DefaultEntity } from 'src/default.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ChatChannelUser extends DefaultEntity {
  @ManyToOne(() => User, (user) => user.chatChannelUsers)
  user: User;

  @Field((type) => Int)
  @PrimaryColumn()
  userId: number;

  @ManyToOne(
    (type) => ChatChannel,
    (chatChannel) => chatChannel.chatChannelUsers,
  )
  chatChannel: ChatChannel;

  @Field((type) => Int)
  @PrimaryColumn()
  chatChannelId: number;

  @ManyToOne((type) => Code, (code) => code.id)
  role: Code;

  @Field((type) => String)
  @Column()
  roleId: string;
}
