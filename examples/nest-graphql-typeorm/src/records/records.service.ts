import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/movies/movies.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateRecordInput } from './createRecordInput.input';
import { Record } from './records.entity';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(input: CreateRecordInput) {
    const record = new Record();
    record.title = input.title;
    record.content = input.content;


    const user = await this.userRepository.findOne({ id: input.user_id });
    const movie = await this.movieRepository.findOne({ id: input.movie_id });

    record.user = user;
    record.movie = movie;

    return await this.recordRepository.save(record);
  }

  async findRecordsByUserId(id: number): Promise<Record[]> {
    return await this.recordRepository.find({ where: { user: id } });
  }
}
