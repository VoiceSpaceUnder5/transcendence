import { ObjectType, Int, Field } from '@nestjs/graphql';
import { ChatChannel } from 'src/chat-channels/chat-channel.entity';
import { Code } from 'src/code/code.entity';
import { DefaultEntity } from 'src/default.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ChatChannelUser extends DefaultEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  // @Field((type) => User) // 이런식으로 graphql 스키마필드에서만 없앨 수 있다.
  @ManyToOne(() => User, (user) => user.chatChannelUsers)
  user: User;

  @Field((type) => Int)
  @Column()
  userId: number;

  // @Field((type) => ChatChannel)
  @ManyToOne(
    (type) => ChatChannel,
    (chatChannel) => chatChannel.chatChannelUsers,
  )
  chatChannel: ChatChannel;

  @Field((type) => Int)
  @Column()
  chatChannelId: number;

  // @Field((type) => Code)
  @ManyToOne((type) => Code, (role) => role.id)
  role: Code;

  @Field((type) => String)
  @Column()
  roleId: string;
}
