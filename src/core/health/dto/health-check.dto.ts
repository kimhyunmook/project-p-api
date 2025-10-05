import { ApiProperty } from "@nestjs/swagger";

export class HealthCheckDto {
  @ApiProperty({
    description: "상태 코드",
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: "상태 메시지",
    example: "OK",
  })
  message: string;

  @ApiProperty({
    description: "서버 시간",
    example: "2024-01-01T00:00:00.000Z",
  })
  timestamp: string;

  @ApiProperty({
    description: "애플리케이션 정보",
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "애플리케이션 이름",
        example: "Project P API",
      },
      version: {
        type: "string",
        description: "애플리케이션 버전",
        example: "1.0.0",
      },
      environment: {
        type: "string",
        description: "실행 환경",
        example: "development",
      },
      uptime: {
        type: "number",
        description: "실행 시간 (초)",
        example: 3600,
      },
    },
  })
  app: {
    name: string;
    version: string;
    environment: string;
    uptime: number;
  };

  @ApiProperty({
    description: "의존성 상태",
    type: "object",
    properties: {
      database: {
        type: "object",
        properties: {
          status: {
            type: "string",
            description: "데이터베이스 상태",
            example: "healthy",
          },
          responseTime: {
            type: "number",
            description: "응답 시간 (ms)",
            example: 5,
          },
        },
      },
      memory: {
        type: "object",
        properties: {
          status: {
            type: "string",
            description: "메모리 상태",
            example: "healthy",
          },
          usage: {
            type: "number",
            description: "메모리 사용률 (%)",
            example: 45.2,
          },
        },
      },
    },
  })
  dependencies: {
    database: {
      status: string;
      responseTime: number;
    };
    memory: {
      status: string;
      usage: number;
    };
  };
}
