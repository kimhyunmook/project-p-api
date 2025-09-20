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

  protected responseData<T, M extends MetaDto | undefined = undefined>(
    message: string,
    data: T,
    meta?: M,
  ): ResponseDto<T> & (M extends MetaDto ? { meta: M } : {}) {
    return {
      statusCode: 200,
      message,
      data,
      ...(meta ? { meta } : {}),
    } as any;
  }
}
