import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { PaginationDto } from "../dto/pagination.dto";
import { mergeEnums } from "./merge-enums.enum";

export function createPaginationDto(enums: object[]) {
  const mergedEnum = mergeEnums(enums);
  class ResultDto extends PaginationDto {
    @ApiProperty({ description: "정렬", enum: mergedEnum })
    @IsEnum(mergedEnum)
    sort?: keyof typeof mergedEnum;
  }

  return ResultDto;
}
