import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRelationInput } from './dto/create-relation.input';
import { RelationArgs } from './dto/relation.args';
import { Relation } from './relation.entity';

@Injectable()
export class RelationService {
  constructor(
    @InjectRepository(Relation)
    private readonly relationRepository: Repository<Relation>,
  ) {}

  findAll(): Promise<Relation[]> {
    return this.relationRepository.find();
  }

  findRelation(relation: RelationArgs): Promise<Relation> {
    const sorted = this.sortRelationArgs(relation);
    const primaryKey = {
      user_first_id: sorted.user_first_id,
      user_second_id: sorted.user_second_id,
    };
    return this.relationRepository.findOneOrFail(primaryKey);
  }

  findRelationByUserId(userId: number): Promise<Relation[]> {
    return this.relationRepository.find({
      where: [{ user_first_id: userId }, { user_second_id: userId }],
    });
  }

  createRelation(relation: CreateRelationInput): Promise<Relation> {
    const sorted = this.sortRelationArgs(relation);
    return this.relationRepository.save(sorted);
  }

  async updateRelation(relation: CreateRelationInput): Promise<Relation> {
    const sorted = this.sortRelationArgs(relation);
    const primaryKey = {
      user_first_id: sorted.user_first_id,
      user_second_id: sorted.user_second_id,
    };
    await this.relationRepository.update(primaryKey, sorted);
    return this.findRelation(sorted);
  }

  sortRelationArgs(relation: RelationArgs): RelationArgs {
    if (relation.user_first_id > relation.user_second_id) {
      const temp = relation.user_first_id;
      relation.user_first_id = relation.user_second_id;
      relation.user_second_id = temp;

      //RE0 or RE1 이었으면 RE1 or RE0 이 되도록 한다.
      if (relation.typeId === 'RE0' || relation.typeId === 'RE1') {
        relation.typeId = relation.typeId === 'RE0' ? 'RE1' : 'RE0';
        //RE3 or RE4 이었으면 RE4 or RE3 이 되도록 한다.
      } else if (relation.typeId === 'RE3' || relation.typeId === 'RE4') {
        relation.typeId = relation.typeId === 'RE3' ? 'RE4' : 'RE3';
      }
    }
    return relation;
  }
}
