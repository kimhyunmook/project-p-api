import { Injectable, LoggerService, LogLevel } from "@nestjs/common";

/**
 * 커스텀 로거 서비스
 * 특정 로그를 필터링하여 콘솔 출력 제어
 */
@Injectable()
export class CustomLoggerService implements LoggerService {
  // 숨기고 싶은 로그 패턴들
  private readonly HIDDEN_LOG_PATTERNS = [
    "InstanceLoader",
    "RoutesResolver",
    "RouterExplorer",
    "NestFactory",
  ];

  // 로그 레벨별 색상
  private readonly COLORS = {
    log: "\x1b[32m", // 녹색
    error: "\x1b[31m", // 빨강
    warn: "\x1b[33m", // 노랑
    debug: "\x1b[35m", // 마젠타
    verbose: "\x1b[36m", // 시안
    reset: "\x1b[0m", // 리셋
  };

  /**
   * 로그를 숨길지 판단
   */
  private shouldHideLog(message: string, context?: string): boolean {
    const fullMessage = `${context || ""} ${message}`;
    return this.HIDDEN_LOG_PATTERNS.some((pattern) => fullMessage.includes(pattern));
  }

  /**
   * 로그 출력 포맷팅
   */
  private formatLog(level: string, message: string, context?: string): string {
    const timestamp = new Date().toLocaleTimeString("ko-KR");
    const color = this.COLORS[level as keyof typeof this.COLORS] || this.COLORS.log;
    const contextStr = context ? `[${context}] ` : "";

    return `${color}[${timestamp}] ${level.toUpperCase()}${this.COLORS.reset} ${contextStr}${message}`;
  }

  log(message: any, context?: string) {
    if (this.shouldHideLog(message, context)) return;
    console.log(this.formatLog("log", message, context));
  }

  error(message: any, trace?: string, context?: string) {
    if (this.shouldHideLog(message, context)) return;
    console.error(this.formatLog("error", message, context));
    if (trace) {
      console.error(trace);
    }
  }

  warn(message: any, context?: string) {
    if (this.shouldHideLog(message, context)) return;
    console.warn(this.formatLog("warn", message, context));
  }

  debug(message: any, context?: string) {
    if (this.shouldHideLog(message, context)) return;
    console.debug(this.formatLog("debug", message, context));
  }

  verbose(message: any, context?: string) {
    if (this.shouldHideLog(message, context)) return;
    console.log(this.formatLog("verbose", message, context));
  }

  /**
   * 특정 패턴 추가
   */
  addHiddenPattern(pattern: string) {
    this.HIDDEN_LOG_PATTERNS.push(pattern);
  }

  /**
   * 특정 패턴 제거
   */
  removeHiddenPattern(pattern: string) {
    const index = this.HIDDEN_LOG_PATTERNS.indexOf(pattern);
    if (index > -1) {
      this.HIDDEN_LOG_PATTERNS.splice(index, 1);
    }
  }
}
