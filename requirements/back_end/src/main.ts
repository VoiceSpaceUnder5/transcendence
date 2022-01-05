import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { dbSeed } from './utils/db.seed';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose'],
  });
  const port = process.env.PORT || 3000;
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
  app.enableCors({
    origin: process.env.FRONT_URI,
    credentials: true,
  });
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONT_URI);
    next();
  });

  await app.listen(port);
  console.log(`listening on port ${port}`);
  dbSeed();
}
bootstrap();
