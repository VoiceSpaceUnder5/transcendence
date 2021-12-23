import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from 'src/movies/movies.module';
import { UsersModule } from 'src/users/users.module';
import { Record } from './records.entity';
import { RecordsResolver } from './records.resolver';
import { RecordsService } from './records.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record]),
    MoviesModule,
    forwardRef(() => UsersModule),
  ],
  exports: [TypeOrmModule],
  providers: [RecordsService, RecordsResolver],
})
export class RecordsModule {}
