import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HealthService } from "./health.service";
import { HealthCheckDto } from "./dto/health-check.dto";

@ApiTags("Health Check")
@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: "헬스 체크",
    description: "애플리케이션의 상태와 의존성들을 확인합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "헬스 체크 성공",
    type: HealthCheckDto,
  })
  @ApiResponse({
    status: 503,
    description: "서비스 불가 - 의존성 문제",
    type: HealthCheckDto,
  })
  async check(): Promise<HealthCheckDto> {
    return this.healthService.check();
  }

  @Get("ready")
  @ApiOperation({
    summary: "레디니스 체크",
    description: "애플리케이션이 요청을 처리할 준비가 되었는지 확인합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "레디 상태",
    type: HealthCheckDto,
  })
  @ApiResponse({
    status: 503,
    description: "레디 상태 아님",
    type: HealthCheckDto,
  })
  async ready(): Promise<HealthCheckDto> {
    return this.healthService.ready();
  }

  @Get("live")
  @ApiOperation({
    summary: "라이브니스 체크",
    description: "애플리케이션이 살아있는지 확인합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "라이브 상태",
    type: HealthCheckDto,
  })
  async live(): Promise<HealthCheckDto> {
    return this.healthService.live();
  }
}
