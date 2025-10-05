import { Injectable, Logger, HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { HealthCheckDto } from "./dto/health-check.dto";

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 전체 헬스 체크
   * 모든 의존성과 시스템 상태를 확인
   */
  async check(): Promise<HealthCheckDto> {
    const startTime = Date.now();

    try {
      // 데이터베이스 상태 확인 (비동기로 처리)
      const dbHealthPromise = this.checkDatabase().catch((error) => {
        this.logger.error("Database health check failed", error);
        return { status: "unhealthy", responseTime: -1 };
      });

      // 메모리 상태 확인
      const memoryHealth = await this.checkMemory();

      // 데이터베이스 상태 확인 완료 대기
      const dbHealth = await dbHealthPromise;

      // 전체 상태 결정 (메모리는 항상 체크, DB는 실패해도 서비스는 살아있음)
      const isHealthy = memoryHealth.status === "healthy";

      const responseTime = Date.now() - startTime;

      const healthData: HealthCheckDto = {
        statusCode: isHealthy ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE,
        message: isHealthy ? "OK" : "Service Unavailable",
        timestamp: new Date().toISOString(),
        app: {
          name: "Project P API",
          version: process.env.npm_package_version || "1.0.0",
          environment: process.env.NODE_ENV || "development",
          uptime: Math.floor(process.uptime()),
        },
        dependencies: {
          database: dbHealth,
          memory: memoryHealth,
        },
      };

      if (!isHealthy) {
        this.logger.warn("Health check failed", {
          database: dbHealth.status,
          memory: memoryHealth.status,
          responseTime,
        });

        throw new HttpException(healthData, HttpStatus.SERVICE_UNAVAILABLE);
      }

      this.logger.debug("Health check passed", {
        responseTime,
        database: dbHealth.responseTime,
        memory: memoryHealth.usage,
      });

      return healthData;
    } catch (error) {
      this.logger.error("Health check error", error);

      if (error instanceof HttpException) {
        throw error;
      }

      const errorResponse: HealthCheckDto = {
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: "Service Unavailable",
        timestamp: new Date().toISOString(),
        app: {
          name: "Project P API",
          version: process.env.npm_package_version || "1.0.0",
          environment: process.env.NODE_ENV || "development",
          uptime: Math.floor(process.uptime()),
        },
        dependencies: {
          database: { status: "unhealthy", responseTime: -1 },
          memory: { status: "unknown", usage: 0 },
        },
      };

      throw new HttpException(errorResponse, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  /**
   * 레디니스 체크
   * 애플리케이션이 요청을 처리할 준비가 되었는지 확인
   */
  async ready(): Promise<HealthCheckDto> {
    try {
      // 데이터베이스 연결 확인
      const dbHealth = await this.checkDatabase();

      if (dbHealth.status !== "healthy") {
        throw new HttpException(
          {
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
            message: "Not Ready - Database unavailable",
            timestamp: new Date().toISOString(),
            app: {
              name: "Project P API",
              version: process.env.npm_package_version || "1.0.0",
              environment: process.env.NODE_ENV || "development",
              uptime: Math.floor(process.uptime()),
            },
            dependencies: {
              database: dbHealth,
              memory: { status: "unknown", usage: 0 },
            },
          },
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message: "Ready",
        timestamp: new Date().toISOString(),
        app: {
          name: "Project P API",
          version: process.env.npm_package_version || "1.0.0",
          environment: process.env.NODE_ENV || "development",
          uptime: Math.floor(process.uptime()),
        },
        dependencies: {
          database: dbHealth,
          memory: { status: "unknown", usage: 0 },
        },
      };
    } catch (error) {
      this.logger.error("Readiness check failed", error);
      throw error;
    }
  }

  /**
   * 라이브니스 체크
   * 애플리케이션이 살아있는지 확인
   */
  async live(): Promise<HealthCheckDto> {
    return {
      statusCode: HttpStatus.OK,
      message: "Alive",
      timestamp: new Date().toISOString(),
      app: {
        name: "Project P API",
        version: process.env.npm_package_version || "1.0.0",
        environment: process.env.NODE_ENV || "development",
        uptime: Math.floor(process.uptime()),
      },
      dependencies: {
        database: { status: "unknown", responseTime: 0 },
        memory: { status: "unknown", usage: 0 },
      },
    };
  }

  /**
   * 데이터베이스 상태 확인
   */
  private async checkDatabase(): Promise<{ status: string; responseTime: number }> {
    const startTime = Date.now();

    try {
      // 타임아웃 설정으로 안전한 체크
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Database connection timeout")), 3000);
      });

      const dbPromise = this.prismaService.$executeRaw`SELECT 1`;

      await Promise.race([dbPromise, timeoutPromise]);

      const responseTime = Date.now() - startTime;

      this.logger.debug("Database health check successful", { responseTime });

      return {
        status: responseTime < 1000 ? "healthy" : "slow",
        responseTime,
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;

      this.logger.error("Database health check failed", {
        error: error.message,
        code: error.code,
        name: error.name,
        responseTime,
      });

      return {
        status: "unhealthy",
        responseTime,
      };
    }
  }

  /**
   * 메모리 상태 확인
   */
  private async checkMemory(): Promise<{ status: string; usage: number }> {
    const memUsage = process.memoryUsage();
    const totalMemory = memUsage.heapTotal;
    const usedMemory = memUsage.heapUsed;
    const usagePercent = (usedMemory / totalMemory) * 100;

    let status: string;
    if (usagePercent < 70) {
      status = "healthy";
    } else if (usagePercent < 90) {
      status = "warning";
    } else {
      status = "critical";
    }

    return {
      status,
      usage: Math.round(usagePercent * 100) / 100,
    };
  }
}
