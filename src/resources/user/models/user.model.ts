import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsDate, IsNumber, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { $Enums } from "@prisma/client";

export class UserModel {
  @ApiProperty({ description: "", type: Number, nullable: false })
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty({ description: "", type: String, nullable: false })
  @IsString()
  email: string;

  @ApiProperty({ description: "", type: String, nullable: false })
  @IsString()
  password: string;

  @ApiProperty({ description: "", type: String, nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: "", type: String, nullable: true })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    description: "",
    type: String,
    nullable: false,
    enum: $Enums.Role,
  })
  @IsEnum($Enums.Role)
  role: $Enums.Role;

  @ApiProperty({
    description: "",
    type: String,
    nullable: false,
    enum: $Enums.UserStatus,
  })
  @IsEnum($Enums.UserStatus)
  status: $Enums.UserStatus;

  @ApiProperty({ description: "", type: String, nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastLoginAt?: Date;

  @ApiProperty({ description: "", type: String, nullable: false })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({ description: "", type: String, nullable: false })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty({ description: "", type: String, nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deletedAt?: Date;
}
