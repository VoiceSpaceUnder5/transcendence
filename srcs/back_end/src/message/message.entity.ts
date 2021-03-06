import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Channel } from 'src/chat-channels/channel.entity';
import { DefaultEntity } from 'src/default.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Message extends DefaultEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.messages, { onDelete: 'CASCADE' })
  user: User;

  @Field((type) => Int)
  @Column()
  userId: number;

  @ManyToOne((type) => Channel, (channel) => channel.messages, {
    onDelete: 'CASCADE',
  })
  channel: Channel;

  @Field((type) => String)
  @Column()
  channelId: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: '255' })
  textMessage: string;
}
