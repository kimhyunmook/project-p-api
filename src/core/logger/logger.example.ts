import { Injectable } from "@nestjs/common";
import { CustomLoggerService } from "./custom-logger.service";

/**
 * 로거 사용 예제
 * 이 파일은 실제 사용되지 않으며, 로거 사용법을 보여주기 위한 예제입니다.
 */
@Injectable()
export class LoggerExampleService {
  constructor(private readonly logger: CustomLoggerService) {}

  /**
   * 기본 로깅 예제
   */
  basicLoggingExample() {
    // 정보 로그
    this.logger.log("사용자가 로그인했습니다", "AuthService");

    // 경고 로그
    this.logger.warn("API 호출 횟수가 제한에 가까워지고 있습니다", "ApiService");

    // 에러 로그
    try {
      throw new Error("데이터베이스 연결 실패");
    } catch (error) {
      this.logger.error("데이터베이스 연결 중 오류 발생", error.stack, "DatabaseService");
    }

    // 디버그 로그
    this.logger.debug("API 응답 데이터: { userId: 123 }", "ApiService");
  }

  /**
   * HTTP 요청 로깅 예제
   */
  httpLoggingExample() {
    // HTTP 요청 로그 (자동으로 HttpLoggingInterceptor가 처리)
    // 하지만 수동으로도 기록 가능
    this.logger.logRequest("GET", "/api/users/123", 200, "127.0.0.1");
  }

  /**
   * 데이터베이스 쿼리 로깅 예제
   */
  databaseLoggingExample() {
    const startTime = Date.now();

    // 데이터베이스 쿼리 실행...
    // ... 쿼리 실행 ...

    const duration = Date.now() - startTime;
    this.logger.logQuery("SELECT * FROM users WHERE id = ?", duration);
  }

  /**
   * 비즈니스 로직 로깅 예제
   */
  businessLoggingExample() {
    // 중요한 비즈니스 이벤트 로깅
    this.logger.logBusiness("사용자 회원가입", {
      userId: 123,
      email: "user@example.com",
      plan: "premium",
    });

    this.logger.logBusiness("결제 완료", {
      orderId: 456,
      amount: 10000,
      currency: "KRW",
    });
  }

  /**
   * 보안 이벤트 로깅 예제
   */
  securityLoggingExample() {
    // 보안 관련 이벤트
    this.logger.logSecurity("로그인 실패", {
      ip: "127.0.0.1",
      username: "admin",
      attempts: 3,
    });

    this.logger.logSecurity("비정상적인 API 접근 시도", {
      ip: "192.168.1.100",
      endpoint: "/admin/users",
      reason: "권한 없음",
    });

    this.logger.logSecurity("계정 잠금", {
      userId: 789,
      reason: "5회 이상 로그인 실패",
    });
  }

  /**
   * 성능 모니터링 예제
   */
  performanceLoggingExample() {
    const startTime = Date.now();

    // 무거운 작업 실행...
    // ... 작업 실행 ...

    const duration = Date.now() - startTime;

    if (duration > 1000) {
      this.logger.warn(
        `작업이 ${duration}ms 걸렸습니다. 성능 최적화가 필요합니다.`,
        "PerformanceMonitor",
      );
    }
  }

  /**
   * 컨텍스트별 로깅 예제
   */
  contextLoggingExample() {
    // 서비스별로 컨텍스트를 지정하여 로그 분류
    this.logger.log("사용자 데이터 조회 시작", "UserService");
    this.logger.log("결제 처리 시작", "PaymentService");
    this.logger.log("이메일 발송 시작", "EmailService");
  }

  /**
   * 환경별 로깅 예제
   */
  environmentLoggingExample() {
    const isProduction = process.env.NODE_ENV === "production";

    if (isProduction) {
      // 프로덕션에서는 중요한 정보만 로깅
      this.logger.log("서비스 시작됨", "Application");
    } else {
      // 개발 환경에서는 상세한 디버그 정보 로깅
      this.logger.debug("서비스 시작됨 - 개발 모드", "Application");
      this.logger.debug("설정값: { port: 3000, db: localhost }", "Application");
    }
  }
}
