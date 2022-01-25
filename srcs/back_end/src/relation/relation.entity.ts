import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Code } from 'src/code/code.entity';
import { DefaultEntity } from 'src/default.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@ObjectType({ description: 'Relation data' })
@Entity()
export class Relation extends DefaultEntity {
  @Field((type) => Int)
  @PrimaryColumn({ type: 'int' })
  @ManyToOne((type) => User, (user) => user.id, { onDelete: 'CASCADE' })
  user_first_id: number;

  @Field((type) => Int)
  @PrimaryColumn({ type: 'int' })
  @ManyToOne((type) => User, (user) => user.id, { onDelete: 'CASCADE' })
  user_second_id: number;

  @Field((type) => Code)
  @ManyToOne((type) => Code, (code) => code.id)
  type: Code;

  @Field()
  @Column()
  typeId: string;
}
