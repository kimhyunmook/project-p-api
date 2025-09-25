import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";
import { IsString, IsOptional, IsDate, IsNumber, IsEnum, IsEmail } from "class-validator";
import { Type } from "class-transformer";
import { $Enums, User } from "@prisma/client";
import { DateAtDto } from "src/common/dto/date-at.dto";

export class UserModel extends IntersectionType(OmitType(DateAtDto, [])) implements User {
  @ApiProperty({ description: "id", type: Number, nullable: false })
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    description: "email",
    type: String,
    nullable: false,
    example: "example@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "password", type: String, nullable: false })
  @IsString()
  password: string;

  @ApiProperty({ description: "name", type: String, nullable: true })
  @IsOptional()
  @IsString()
  name: string | null;

  @ApiProperty({ description: "image url", type: String, nullable: true })
  @IsOptional()
  @IsString()
  image: string | null;

  @ApiProperty({
    description: "",
    type: String,
    nullable: false,
    enum: $Enums.Role,
    default: $Enums.Role.USER,
  })
  @IsEnum($Enums.Role)
  role: $Enums.Role;

  @ApiProperty({
    description: "상태",
    type: String,
    nullable: false,
    enum: $Enums.UserStatus,
    default: $Enums.UserStatus.ACTIVE,
  })
  @IsEnum($Enums.UserStatus)
  status: $Enums.UserStatus;

  @ApiProperty({ description: "최근 로그인 시간", type: Date, nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastLoginAt: Date | null;
}
