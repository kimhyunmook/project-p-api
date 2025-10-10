import { Global, Logger, Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { CustomLoggerService } from "./custom-logger.service";
import { winstonConfig } from "./winston.config";

/**
 * 로거 모듈
 * Winston 기반 날짜별 로그 파일 저장
 */
@Global()
@Module({
  imports: [WinstonModule.forRoot(winstonConfig)],
  providers: [Logger, CustomLoggerService],
  exports: [Logger, CustomLoggerService, WinstonModule],
})
export class LoggerModule {}
