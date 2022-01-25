import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Code } from 'src/code/code.entity';
import { DefaultEntity } from 'src/default.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Achievement extends DefaultEntity {
  @Field((type) => Int)
  @PrimaryColumn({ type: 'int' })
  @ManyToOne((type) => User, (user) => user.id, { onDelete: 'CASCADE' })
  userId: number;

  @Field()
  @PrimaryColumn()
  @ManyToOne((type) => Code, (code) => code.id)
  typeId: string;
}
