import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Movie } from "./movies.entity";
import { MoviesService } from "./movies.service";

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Query(() => [Movie], { name: 'movies' })
  async getAllMovies() {
    return await this.moviesService.findAll();
  }

  @Mutation(() => Movie)
  async createMovie(@Args('title') title: string) {
    return await this.moviesService.create(title);
  }

}