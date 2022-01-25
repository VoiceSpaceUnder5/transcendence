import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Code } from 'src/code/code.entity';
import { DefaultEntity } from 'src/default.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Record extends DefaultEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  leftUser: User;

  @Field((type) => Int)
  @Column()
  leftUserId: number;

  @ManyToOne(() => User, (user) => user.id)
  rightUser: User;

  @Field((type) => Int)
  @Column()
  rightUserId: number;

  @Field((type) => Int)
  @Column()
  leftUserScore: number;

  @Field((type) => Int)
  @Column()
  rightUserScore: number;

  @Field((type) => Code)
  @ManyToOne(() => Code, (code) => code.id)
  result: string;

  @Field()
  @Column()
  resultId: string;

  @Field((type) => Code)
  @ManyToOne(() => Code, (code) => code.id)
  type: string;

  @Field()
  @Column()
  typeId: string;

  @Field((type) => Code)
  @ManyToOne(() => Code, (code) => code.id)
  mode: string;

  @Field()
  @Column()
  modeId: string;
}
