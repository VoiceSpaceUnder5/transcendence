import { Field, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export abstract class DefaultEntity {
  @Field((type) => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
