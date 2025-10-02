import { ApiProperty } from "@nestjs/swagger";
import { MetaDto } from "./list-response.dto";

export class ResponseDto {
  @ApiProperty({ description: "상태 코드", type: Number, example: 200 })
  statusCode: number;

  @ApiProperty({ description: "메시지", type: String, example: "반환 메세지" })
  message: string;
}

class IdNumberDataDto<T = number> {
  @ApiProperty({ description: "아이디", type: Number })
  id: T;
}

export class IdOnlyResponseDto<T = number> extends ResponseDto {
  @ApiProperty({ description: "데이터", type: IdNumberDataDto<T>, nullable: false })
  data: IdNumberDataDto<T>;
}

export class NullDataResponseDto extends ResponseDto {
  @ApiProperty({ description: "반환 데이터", example: null, nullable: true })
  data: unknown = null;
}
