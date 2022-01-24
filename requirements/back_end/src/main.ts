import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { dbSeed } from './utils/db.seed';
import * as bodyParser from 'body-parser';
import { AccessGuard } from './auth/guard/access.guard';
import { TwoFactorGuard } from './auth/guard/twoFactor.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose'],
  });
  const port = process.env.PORT || 3000;

  //✅ 앱이 실행되면서 CORS 설정을 추가합니다.
  app.enableCors({
    origin: [process.env.FRONT_URI, process.env.ADMIN_URI],
    credentials: true,
  });

  //✅ 앱이 실행되면서 쿠키 파서를 추가합니다.
  app.use(cookieParser());

  //✅ 앱이 실행되면서 body 파서의 설정을 추가합니다. 이미지 업로드 용량 제한을 변경합니다.
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  //✅ 앱이 리스폰스를 보낼 때, 헤더에 Access-Control-Allow-Origin에 프론트엔드 URI를 추가합니다.(Cors 허용을 위해)
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Origin',
      process.env.FRONT_URI,
      process.env.ADMIN_URI,
    );
    next();
  });

  //✅ 앱이 실행되면서 ValidationPipe 설정을 추가합니다.
  app.useGlobalPipes(new ValidationPipe({}));

  //✅ 전역가드로 AccessGuard를 전달해준다. 이 가드의 예외처리를 위한 리플랙터도 전달.
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AccessGuard(reflector));

  //✅ 앱이 실행되면서 데이터베이스를 시딩합니다.
  dbSeed();

  //✅ 앱을 실행 시킵니다.
  await app.listen(port);
  console.log(`listening on port ${port}`);
}
bootstrap();
