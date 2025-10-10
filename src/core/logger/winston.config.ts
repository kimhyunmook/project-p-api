import * as winston from "winston";
import * as DailyRotateFile from "winston-daily-rotate-file";
import { utilities as nestWinstonModuleUtilities } from "nest-winston";
import * as path from "path";

/**
 * Winston 로거 설정 (날짜 폴더별 관리)
 * - logs/2025-10-10/app.log
 * - logs/2025-10-10/error.log
 */

// 로그 디렉토리
const LOG_DIR = process.env.LOG_DIR || "logs";

// 현재 날짜로 폴더 생성 (YYYY-MM-DD)
const getLogDir = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const dateFolder = `${year}-${month}-${day}`;
  return path.join(LOG_DIR, dateFolder);
};

// 숨길 로그 패턴 (NestJS 시스템 로그)
const HIDDEN_PATTERNS = [
  "InstanceLoader",
  "RoutesResolver",
  "RouterExplorer",
  "NestFactory",
  "Mapped {",
  "Database connected",
  "Database disconnected",
];

// 로그 필터 (특정 패턴 제외)
const filterFormat = winston.format((info) => {
  const message = typeof info.message === "string" ? info.message : "";
  const context = typeof info.context === "string" ? info.context : "";
  const fullText = `${context} ${message}`;

  // 숨길 패턴이 있으면 null 반환 (로그 제외)
  if (HIDDEN_PATTERNS.some((pattern) => fullText.includes(pattern))) {
    return false;
  }

  return info;
})();

// 로그 포맷 정의
const logFormat = winston.format.combine(
  filterFormat, // 필터 먼저 적용
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
);

// 콘솔 출력 포맷 (개발 환경용)
const consoleFormat = winston.format.combine(
  filterFormat, // 필터 적용
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.ms(),
  nestWinstonModuleUtilities.format.nestLike("ProjectP", {
    colors: true,
    prettyPrint: true,
  }),
);

// 모든 로그 파일 (날짜 폴더별)
const allLogsTransport = new winston.transports.File({
  level: "debug",
  dirname: getLogDir(),
  filename: "app.log",
  maxsize: 20 * 1024 * 1024, // 20MB
  format: logFormat,
});

// 에러 로그만 별도 저장
const errorLogsTransport = new winston.transports.File({
  level: "error",
  dirname: getLogDir(),
  filename: "error.log",
  maxsize: 20 * 1024 * 1024, // 20MB
  format: logFormat,
});

// Winston 인스턴스 생성
export const winstonConfig = {
  transports: [
    // 콘솔 출력
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
      format: process.env.NODE_ENV === "production" ? logFormat : consoleFormat,
    }),
    // 파일 출력
    allLogsTransport,
    errorLogsTransport,
  ],
  // 처리되지 않은 예외는 에러 로그에 포함
  exceptionHandlers: [errorLogsTransport],
  // 처리되지 않은 rejection도 에러 로그에 포함
  rejectionHandlers: [errorLogsTransport],
};

// Winston 인스턴스 생성 함수
export const createWinstonLogger = () => {
  return winston.createLogger(winstonConfig);
};
