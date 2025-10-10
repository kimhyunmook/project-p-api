import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerService } from "./core/swagger/swagger.service";
import { setupSecurity } from "./core/config/security.setup";
import { setupValidation } from "./core/config/validation.setup";
import { setupLogger, logServerStart } from "./core/config/logger.setup";

async function bootstrap() {
  // 앱 생성 (기본 로거 비활성화)
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: false,
  });

  const configService = app.get(ConfigService);

  // 1. Logger 설정
  setupLogger(app);

  // 2. Security 설정 (Helmet, CORS)
  setupSecurity(app, configService);

  // 3. Validation 설정 (Pipe, Body Parser)
  setupValidation(app, configService);

  // 4. Swagger 설정
  const swaggerService = app.get(SwaggerService);
  swaggerService.setup(app);

  // 5. 서버 시작
  const port = configService.get<number>("PORT") || 3000;
  const env = configService.get<string>("NODE_ENV") || "development";

  await app.listen(port);

  // 6. 시작 로그
  logServerStart(app, port, env);
}

void bootstrap();
