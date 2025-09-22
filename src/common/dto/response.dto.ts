import { ApiProperty } from "@nestjs/swagger";
import { MetaDto } from "./list-response.dto";

export class ResponseDto {
  @ApiProperty({ description: "상태 코드", type: Number })
  statusCode: number;

  @ApiProperty({ description: "메시지", type: String })
  message: string;
}

export class IdOnlyResponseDto extends ResponseDto {
  @ApiProperty({ description: "데이터", nullable: false })
  data: DataDto;
}

class DataDto {
  @ApiProperty({ description: "아이디", type: Number })
  id: bigint;
}

export class NullDataResponseDto extends ResponseDto {
  data: null;
}
