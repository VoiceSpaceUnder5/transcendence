import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async create(title: string): Promise<Movie> {
    const movie = new Movie();
    movie.title = title;
    return await this.movieRepository.save(movie);
  }
}
