import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlJwtAccessGuard } from 'src/auth/guard/gql-jwt.guard';
import { Code } from 'src/code/code.entity';
import { CodeService } from 'src/code/code.service';
import { CreateRelationInput } from './dto/create-relation.input';
import { RelationArgs } from './dto/relation.args';
import { Relation } from './relation.entity';
import { RelationService } from './relation.service';

@Resolver(() => Relation)
@UseGuards(GqlJwtAccessGuard)
export class RelationResolver {
  constructor(
    private readonly realtionService: RelationService,
    private readonly codeService: CodeService,
  ) {}

  @Query(() => [Relation])
  async getRelations() {
    return this.realtionService.findAll();
  }

  @Query(() => [Relation])
  async getRelationsByUserIdTreatAsFirst(
    @Args('userId') userId: number,
    @Args('typeId', { nullable: true }) typeId?: string,
  ) {
    return this.realtionService.getRelationsByUserIdTreatAsFirst(
      userId,
      typeId,
    );
  }

  @Query(() => Relation)
  async getRelation(@Args() relation: RelationArgs) {
    return this.realtionService.findRelation(relation);
  }
  @Mutation(() => Relation)
  async createRelation(
    @Args('createRelationInput') relation: CreateRelationInput,
  ) {
    return this.realtionService.createRelation(relation);
  }

  @Mutation(() => Relation)
  async updateRelation(
    @Args('updateRelationInput') relation: CreateRelationInput,
  ) {
    return this.realtionService.updateRelation(relation);
  }

  @ResolveField(() => Code)
  async type(@Parent() relation: Relation) {
    return this.codeService.findCodebyId(relation.typeId);
  }
}
