import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestExpressApplication } from "@nestjs/platform-express";
import helmet from "helmet";
import { CustomLoggerService } from "./core/logger/custom-logger.service";
import { SwaggerService } from "./core/swagger/swagger.service";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new CustomLoggerService(),
  });
  const configService = app.get(ConfigService);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
      crossOriginEmbedderPolicy: false, // Swagger 호환성
    }),
  );

  const allowedOrigins = configService.get<string>("LOCALHOST_URL")?.split(",") || [];
  app.enableCors({
    origin: (origin, callback) => {
      // origin이 없으면 (같은 서버 요청) 허용
      if (!origin) return callback(null, true);

      // 허용된 origin만 접근 가능
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy: Not allowed origin"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    maxAge: 3600, // preflight 캐시 시간
  });

  app.useBodyParser("json", { limit: "5mb" });

  app.set("trust proxy", true);

  // Swagger 및 전역 설정
  const swaggerService = app.get(SwaggerService);
  swaggerService.setup(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // DTO에 없는 속성 제거
      forbidNonWhitelisted: true, // DTO에 없는 속성 있으면 에러
      stopAtFirstError: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      disableErrorMessages: configService.get<string>("NODE_ENV") === "production", // 프로덕션에서는 에러 메시지 숨김
    }),
  );

  const port = configService.get<number>("PORT") || 3000;
  await app.listen(port);

  // 서버 시작 로그
  const logger = new CustomLoggerService();
  logger.log(`🚀 Server is running on: http://localhost:${port}`);
  logger.log(`📚 Swagger documentation: http://localhost:${port}/api-docs`);
  logger.log(`🔒 Environment: ${configService.get<string>("NODE_ENV") || "development"}`);
  logger.log(`🛡️ Security: Helmet, CORS enabled`);
}

void bootstrap();
