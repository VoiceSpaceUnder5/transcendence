import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Record } from 'src/records/records.entity';
import { Movie } from 'src/movies/movies.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column()
  nickname?: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => Boolean, { defaultValue: true })
  @Column({ default: true })
  flag_active: boolean;

  @Field(() => [Record])
  @OneToMany(() => Record, record => record.user)
  records: Record[];
}
