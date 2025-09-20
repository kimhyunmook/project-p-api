import { ApiProperty } from "@nestjs/swagger";

export class ResponseDto<T> {
  @ApiProperty({ description: "상태 코드", type: Number })
  statusCode: number;

  @ApiProperty({ description: "메시지", type: String })
  message: string;

  @ApiProperty({ description: "데이터", nullable: true })
  data: T;
}

export class IdOnlyResponseDto extends ResponseDto {
  @ApiProperty({ description: "데이터", nullable: false })
  data: DataDto;
}

class DataDto {
  @ApiProperty({ description: "아이디", type: Number })
  id: number;
}

export class NullDataResponseDto extends ResponseDto<null> {}
