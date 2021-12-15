import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export abstract class DefaultEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
