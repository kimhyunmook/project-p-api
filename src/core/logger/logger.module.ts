import { Global, Logger, Module } from "@nestjs/common";
import { CustomLoggerService } from "./custom-logger.service";

@Global()
@Module({
  providers: [Logger, CustomLoggerService],
  exports: [Logger, CustomLoggerService],
})
export class LoggerModule {}
