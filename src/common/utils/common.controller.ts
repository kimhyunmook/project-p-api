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

  protected responseData<T>(
    message: string,
    data: T, // undefined 허용 X
    meta?: MetaDto,
  ): ResponseDto & { data: T } & { meta?: MetaDto } {
    return {
      statusCode: 200,
      message,
      data, // null 처리 제거
      ...(meta ? { meta } : {}),
    };
  }
}
