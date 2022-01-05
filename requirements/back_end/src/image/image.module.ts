import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageService } from './image.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
