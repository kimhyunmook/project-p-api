import { ApiProperty } from "@nestjs/swagger";

export class ResponseDto {
  @ApiProperty({ description: "상태 코드", type: Number, example: 200 })
  statusCode: number;

  @ApiProperty({ description: "메시지", type: String, example: "반환 메세지" })
  message: string;
}

export class IdNumberDataDto {
  @ApiProperty({ description: "아이디", type: Number })
  id: number;
}

export class NumberIdOnlyResponseDto extends ResponseDto {
  @ApiProperty({ description: "데이터", type: IdNumberDataDto, nullable: false })
  data: IdNumberDataDto;
}

export class IdStringDataDto {
  @ApiProperty({ description: "아이디", type: String })
  id: string;
}

export class StringIdOnlyResponseDto extends ResponseDto {
  @ApiProperty({ description: "데이터", type: IdNumberDataDto, nullable: false })
  data: IdStringDataDto;
}

export class NullDataResponseDto extends ResponseDto {
  @ApiProperty({ description: "반환 데이터", example: null, nullable: true })
  data: unknown = null;
}
