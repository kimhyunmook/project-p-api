import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";

export class DateAtDto {
  @ApiProperty({ description: "생성일", type: Date, nullable: false })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({ description: "수정일", type: Date, nullable: false })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;

  @ApiPropertyOptional({ description: "삭제일", type: Date, nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deletedAt: Date | null;
}
