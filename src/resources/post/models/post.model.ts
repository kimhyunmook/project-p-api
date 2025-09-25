import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";
import { IsString, IsOptional, IsBoolean, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { $Enums, Post } from "@prisma/client";
import { DateAtDto } from "src/common/dto/date-at.dto";

export class PostModel extends IntersectionType(OmitType(DateAtDto, [])) implements Post {
  @ApiProperty({ description: "아이디", type: Number, nullable: false })
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty({ description: "제목", type: String, nullable: false })
  @IsString()
  title: string;

  @ApiProperty({ description: "내용", type: String, nullable: false })
  @IsString()
  content: string;

  @ApiProperty({ description: "공개/비공개", type: Boolean, nullable: false })
  @IsBoolean()
  published: boolean;

  @ApiProperty({ description: "작성자 아이디", type: Number, nullable: false })
  @IsNumber()
  @Type(() => Number)
  authorId: number;

  @ApiProperty({ description: "카테고리 아이디", type: Number, nullable: true })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId: number | null;
}
