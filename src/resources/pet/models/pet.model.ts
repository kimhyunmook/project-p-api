import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  IsDate,
  IsBoolean,
  IsNumber,
  IsEnum,
} from "class-validator";
import { Type } from "class-transformer";
import { $Enums, Pet } from "@prisma/client";

export class PetModel implements Pet {
  @ApiProperty({ description: "아이디", type: Number, nullable: false })
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    description: "애완동물 타입",
    nullable: false,
    enum: $Enums.PetType,
  })
  @IsEnum($Enums.PetType)
  type: $Enums.PetType;

  @ApiProperty({ description: "애완동물 이름", type: String, nullable: false })
  @IsString()
  name: string;

  @ApiProperty({ description: "애완동물 나이", type: Number, nullable: false })
  @IsNumber()
  @Type(() => Number)
  age: number;

  @ApiProperty({ description: "주인 아이디", type: Number, nullable: false })
  @IsNumber()
  @Type(() => Number)
  ownerId: number;

  @ApiProperty({ description: "카테고리 아이디", type: Number, nullable: true })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId: number | null;

  @ApiProperty({ description: "태그 아이디", type: Number, nullable: true })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tagId: number | null;

  @ApiProperty({ description: "생성일", type: Date, nullable: false })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({ description: "수정일", type: Date, nullable: false })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty({ description: "삭제일", type: Date, nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deletedAt: Date | null;
}
