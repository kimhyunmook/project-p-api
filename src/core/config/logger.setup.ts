import { NestExpressApplication } from "@nestjs/platform-express";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

/**
 * Logger 설정
 * Winston 로거를 앱의 기본 로거로 설정
 */
export function setupLogger(app: NestExpressApplication) {
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
}

/**
 * 서버 시작 로그 출력
 */
export function logServerStart(app: NestExpressApplication, port: number, env: string) {
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  logger.log(`🚀 Server is running on: http://localhost:${port}`);
  logger.log(`📚 Swagger documentation: http://localhost:${port}/api-docs`);
  logger.log(`🔒 Environment: ${env}`);
  logger.log(`🛡️ Security: Helmet, CORS enabled`);
}
