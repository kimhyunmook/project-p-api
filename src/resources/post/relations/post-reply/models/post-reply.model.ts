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
import { $Enums, PostReply } from "@prisma/client";

export class PostReplyModel implements PostReply {
  @ApiProperty({ description: "아이디", type: Number, nullable: false })
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty({ description: "게시글 아이디", type: Number, nullable: false })
  @IsNumber()
  @Type(() => Number)
  postId: number;

  @ApiProperty({ description: "내용", type: String, nullable: false })
  @IsString()
  content: string;

  @ApiProperty({
    description: "상태",
    nullable: false,
    enum: $Enums.CommonStatus,
  })
  @IsEnum($Enums.CommonStatus)
  status: $Enums.CommonStatus;

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
