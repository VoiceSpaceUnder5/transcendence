import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.enableCors();
  app.use(cookieParser());
  await app.listen(port);
  console.log(`listening on port ${port}`);
}
bootstrap();
