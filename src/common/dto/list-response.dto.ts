import { ResponseDto } from "./response.dto";

export class ListResponseDto extends ResponseDto {
  meata: MetaDto;
}

class MetaDto {
  totalCount: number;
  page: number;
  limit: number;
  totlaPages: number;
}
