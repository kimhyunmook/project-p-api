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
import { $Enums, Post } from "@prisma/client";

export class PostModel implements Post {
  @ApiProperty({ description: "", type: Number, nullable: false })
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty({ description: "", type: String, nullable: false })
  @IsString()
  title: string;

  @ApiProperty({ description: "", type: String, nullable: false })
  @IsString()
  content: string;

  @ApiProperty({ description: "", type: Boolean, nullable: false })
  @IsBoolean()
  published: boolean;

  @ApiProperty({ description: "", type: Number, nullable: false })
  @IsNumber()
  @Type(() => Number)
  authorId: number;

  @ApiProperty({ description: "", type: Number, nullable: true })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId: number | null;

  @ApiProperty({ description: "", type: Date, nullable: false })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({ description: "", type: Date, nullable: false })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty({ description: "", type: Date, nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deletedAt: Date | null;
}
