import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Code {
  @Field()
  @Column({ type: 'varchar', length: '5' })
  group: string;

  @Field()
  @PrimaryColumn({ type: 'varchar', length: '10', unique: true })
  code: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  label_korean?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  label_english?: string;

  @Field((type) => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
