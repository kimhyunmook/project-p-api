import { ApiProperty } from "@nestjs/swagger";
import { MetaDto } from "./list-response.dto";

export class ResponseDto<T = null> {
  @ApiProperty({ description: "상태 코드", type: Number })
  statusCode: number;

  @ApiProperty({ description: "메시지", type: String })
  message: string;

  @ApiProperty({ description: "데이터", nullable: true })
  data: T;

  // @ApiProperty({ description: "메타 데이터", nullable: true })
  // meta: MetaDto | null;
}

export class IdOnlyResponseDto extends ResponseDto<DataDto> {
  @ApiProperty({ description: "데이터", nullable: false })
  declare data: DataDto;
}

class DataDto {
  @ApiProperty({ description: "아이디", type: Number })
  id: bigint;
}

export class NullDataResponseDto extends ResponseDto<null> {}
