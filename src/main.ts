import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    // dto 에 정의 되어있지 않은 속성일 경우에 무시한다.
    whitelist: true,
    // dto 에 정의 되어있지 않은 속성이 넘어올경우 에러를 발생시킨다.
    forbidNonWhitelisted: true,
    // 유저가 보낸거를 우리가 실제로 원하는 타입으로 바꿔준다.
    // 원래 URL로 받아오는것들은 다 string인데 예를들어 movies/1 같은 경우에 이걸 처리하고싶으면
    // service에서 string 을 number로 바꿔줘야 하는데 transform을 사용하면 그럴 필요가 없다.
    transform:true
  }
  ));
  await app.listen(3000);
}
bootstrap();
