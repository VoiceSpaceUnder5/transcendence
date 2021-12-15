import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  exports: [TypeOrmModule],
  providers: [MoviesService, MoviesResolver],
})
export class MoviesModule {}
