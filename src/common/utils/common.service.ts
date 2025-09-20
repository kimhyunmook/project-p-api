import { ResponseDto } from "../dto/response.dto";

export class CommonSerivce {
  constructor(private readonly name: string) {}

  protected CREATE = `${this.name}이(가) 생성되었습니다.`;
  protected UPDATE = `${this.name}이(가) 수정되었습니다.`;
  protected FIND_UNIQUE = `${this.name}을 상세 조회했습니다.`;
  protected FIND_MANY = `${this.name}의 목록을 조회했습니다.`;

  protected responseData<T>(message: string, data: T): ResponseDto<T> {
    return {
      statusCode,
      message,
      data,
    };
  }
}
