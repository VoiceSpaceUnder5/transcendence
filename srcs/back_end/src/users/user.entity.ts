import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { ChannelUser } from 'src/chat-channel-user/channel-user.entity';
import { Code } from 'src/code/code.entity';
import { DefaultEntity } from 'src/default.entity';
import { Message } from 'src/message/message.entity';
import { Record } from 'src/record/record.entity';
import { Relation } from 'src/relation/relation.entity';
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

  @IsEmail()
  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  @Column({
    nullable: true,
    default: `https://i.ibb.co/Y4ggzLc/1-W35-QUSv-Gpc-Lux-Po3-SRTH4w.png`,
  })
  profile_image?: string;

  @Field(() => String, { nullable: true })
  @Column({
    nullable: true,
    default: `https://i.ibb.co/DPddxR9/1-W35-QUSv-Gpc-Lux-Po3-SRTH4w.png`,
  })
  profile_image_thumb?: string;

  @Field(() => String, { nullable: true })
  @Column({
    nullable: true,
    default: `https://i.ibb.co/Y4ggzLc/1-W35-QUSv-Gpc-Lux-Po3-SRTH4w.png`,
  })
  profile_image_medium?: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    default: '자신을 소개해보세요',
  })
  description?: string;

  @Field((type) => Code)
  @ManyToOne((type) => Code, (code) => code.id)
  authority: Code;

  @Field()
  @Column({ default: 'UA1' })
  authorityId: string;

  @Field(() => [ChannelUser])
  @OneToMany(() => ChannelUser, (channelUser) => channelUser.user)
  channelUsers: ChannelUser[];

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @Field(() => [Relation], { nullable: 'items' })
  relations: Relation[];

  @Field(() => [Record], { nullable: 'items' })
  @OneToMany(() => Record, (record) => record.leftUser)
  @OneToMany(() => Record, (record) => record.rightUser)
  records: Record[];

  @Field((type) => Code)
  @ManyToOne((type) => Code, (code) => code.id)
  connectionStatus: Code;

  @Field()
  @Column({ default: 'CS1' })
  connectionStatusId: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  twoFactorAuth: boolean;

  @Column({ type: 'varchar', length: 200, nullable: true })
  twoFactorAuthSecret?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  twoFactorAuthImageUri?: string;
}
