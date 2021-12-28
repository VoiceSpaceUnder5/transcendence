import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose'],
  });
  const port = process.env.PORT || 3000;
  app.use(cookieParser());
  app.enableCors();

  await app.listen(port);
  console.log(`listening on port ${port}`);
}
bootstrap();
