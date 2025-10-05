import { Logger } from "@nestjs/common";
import { MetaDto } from "../dto/list-response.dto";

/**
 * 공통 컨트롤러 클래스
 * 모든 컨트롤러의 기본 기능을 제공
 */
export class CommonController {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(private readonly name: string) {}

  /**
   * 생성 메시지 반환
   */
  protected get CREATE(): string {
    return `${this.name}이(가) 생성되었습니다.`;
  }

  /**
   * 수정 메시지 반환
   */
  protected get UPDATE(): string {
    return `${this.name}이(가) 수정되었습니다.`;
  }

  /**
   * 상세 조회 메시지 반환
   */
  protected get FIND_UNIQUE(): string {
    return `${this.name}을 상세 조회했습니다.`;
  }

  /**
   * 목록 조회 메시지 반환
   */
  protected get FIND_MANY(): string {
    return `${this.name}의 목록을 조회했습니다.`;
  }

  /**
   * 삭제 메시지 반환
   */
  protected get DELETE(): string {
    return `${this.name}이(가) 삭제되었습니다.`;
  }

  /**
   * 응답 데이터 생성 (오버로드)
   */
  protected responseData(message: string): { statusCode: number; message: string; data: null };
  protected responseData<T>(
    message: string,
    data: T | null,
  ): { statusCode: number; message: string; data: T };
  protected responseData<T>(
    message: string,
    data: T | null,
    meta: MetaDto,
  ): { statusCode: number; message: string; data: T; meta: MetaDto };

  /**
   * 표준화된 응답 데이터 생성
   *
   * @param message - 응답 메시지
   * @param data - 응답 데이터 (선택적)
   * @param meta - 페이지네이션 메타 데이터 (선택적)
   * @returns 표준화된 응답 객체
   *
   * @example
   * ```typescript
   * // 데이터 없음
   * return this.responseData("삭제되었습니다.");
   *
   * // 데이터 있음
   * return this.responseData("조회 완료", userData);
   *
   * // 페이지네이션 포함
   * return this.responseData("목록 조회", users, paginationMeta);
   * ```
   */
  protected responseData<T>(
    message: string,
    data?: T | null,
    meta?: MetaDto,
  ): { statusCode: number; message: string; data: T | null; meta?: MetaDto } {
    // 입력 검증
    if (!message || typeof message !== "string") {
      this.logger.warn("Invalid message provided to responseData");
      message = "요청이 처리되었습니다.";
    }

    // 데이터 정규화
    const normalizedData = data === undefined ? null : data;

    // 응답 객체 생성
    const response = {
      statusCode: 200,
      message,
      data: normalizedData,
      ...(meta && { meta }),
    };

    // 개발 환경에서 로깅
    if (process.env.NODE_ENV === "development") {
      this.logger.debug(`Response: ${message}`, {
        hasData: normalizedData !== null,
        hasMeta: !!meta,
        dataType: typeof normalizedData,
      });
    }

    return response;
  }

  /**
   * 에러 응답 생성
   *
   * @param message - 에러 메시지
   * @param statusCode - HTTP 상태 코드 (기본값: 500)
   * @returns 에러 응답 객체
   */
  protected errorResponse(message: string, statusCode: number = 500) {
    this.logger.error(`Error response: ${message}`, { statusCode });

    return {
      statusCode,
      message,
      data: null,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * 성공 응답 생성 (간단한 버전)
   *
   * @param data - 응답 데이터
   * @param message - 커스텀 메시지 (선택적)
   * @returns 성공 응답 객체
   */
  protected successResponse<T>(data: T, message?: string) {
    return this.responseData(message || "요청이 성공적으로 처리되었습니다.", data);
  }
}
