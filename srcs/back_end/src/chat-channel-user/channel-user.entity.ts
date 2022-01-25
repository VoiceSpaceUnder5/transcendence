import { ObjectType, Int, Field } from '@nestjs/graphql';
import { Channel } from 'src/chat-channels/channel.entity';
import { Code } from 'src/code/code.entity';
import { DefaultEntity } from 'src/default.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ChannelUser extends DefaultEntity {
  @ManyToOne(() => User, (user) => user.channelUsers, { onDelete: 'CASCADE' })
  user: User;

  @Field((type) => Int)
  @PrimaryColumn()
  userId: number;

  @ManyToOne((type) => Channel, (channel) => channel.channelUsers, {
    onDelete: 'CASCADE',
  })
  channel: Channel;

  @Field((type) => String)
  @PrimaryColumn()
  channelId: string;

  @ManyToOne((type) => Code, (code) => code.id)
  role: Code;

  @Field((type) => String)
  @Column()
  roleId: string;
}
