import { ListResponseDto, MetaDto } from "../dto/list-response.dto";
import { ResponseDto } from "../dto/response.dto";

export class CommonController {
  constructor(private readonly name: string) {}

  protected get CREATE(): string {
    return `${this.name}이(가) 생성되었습니다.`;
  }

  protected get UPDATE(): string {
    return `${this.name}이(가) 수정되었습니다.`;
  }

  protected get FIND_UNIQUE(): string {
    return `${this.name}을 상세 조회했습니다.`;
  }

  protected get FIND_MANY(): string {
    return `${this.name}의 목록을 조회했습니다.`;
  }

  protected get DELETE(): string {
    return `${this.name}이(가) 삭제되었습니다.`;
  }

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

  protected responseData<T>(message: string, data?: T | null, meta?: MetaDto) {
    // 데이터 값이 없을 경우 null
    if (data === undefined) data = null;

    // 메타 데이터가 없을 경우 반환 케이스
    if (!meta) return { statusCode: 200, message, data };

    // 전체 반환 케이스
    return { statusCode: 200, message, data, meta };
  }
}
