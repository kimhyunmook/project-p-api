import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { Type as NestType } from "@nestjs/common";
import { PaginationDto } from "../dto/pagination.dto";

export function createPaginationDto<T extends object>(sortEnum?: T, ...etc: NestType[]) {
  let Base = PaginationDto;

  // etc DTO들을 Intersection으로 합치기
  if (etc.length > 0) {
    Base = IntersectionType(Base, ...etc);
  }

  // sortEnum이 있으면 정렬 필드 추가
  if (sortEnum) {
    class ResultDto extends Base {
      @ApiProperty({ description: "정렬", enum: sortEnum })
      @IsEnum(sortEnum)
      sort?: keyof T;
    }
    return ResultDto;
  }

  return Base;
}
