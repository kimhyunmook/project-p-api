import { ApiProperty } from "@nestjs/swagger";
import { ResponseDto } from "./response.dto";

export class ListResponseDto extends ResponseDto {
  meta?: MetaDto;
}

export class MetaDto {
  @ApiProperty({ description: "전체 수" })
  totalCount: number;

  @ApiProperty({ description: "페이지" })
  page: number;

  @ApiProperty({ description: "한 페이지의 제한 수" })
  limit: number;

  @ApiProperty({ description: "총 페이지 수" })
  totalPages: number;
}
