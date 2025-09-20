import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Project P API")
    .setDescription("The Project P API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/swagger", app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 자동 타입 변환
      whitelist: true, // DTO에 없는 프로퍼티는 제거
      forbidNonWhitelisted: true, // 허용되지 않은 프로퍼티가 있으면 400 에러
      stopAtFirstError: true, // 첫 번째 에러에서 멈춤
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: process.env.LOCALHOST_URL?.split(","),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
