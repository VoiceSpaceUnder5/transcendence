import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/movies/movies.entity';
import { User } from 'src/users/user.entity';

@ObjectType()
@Entity()
export class Record {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Movie)
  movie: Movie;

  @ManyToOne(() => User, user => user.records)
  user: User;
}
