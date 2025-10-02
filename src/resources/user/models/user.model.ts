import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";
import { IsString, IsOptional, IsDate, IsNumber, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { $Enums, User } from "@prisma/client";
import { DateAtDto } from "src/common/dto/date-at.dto";
import { IsEmailOrUsername } from "src/common/validators/is-email-or-username.validator";

export class UserModel extends IntersectionType(OmitType(DateAtDto, [])) implements User {
  @ApiProperty({ description: "id", type: Number, nullable: false })
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    description: "이메일 또는 사용자명 (admin 허용)",
    type: String,
    nullable: false,
    example: "example@example.com",
  })
  @IsEmailOrUsername(["admin"])
  email: string;

  @ApiProperty({ description: "비밀번호", type: String, nullable: false })
  @IsString()
  password: string;

  @ApiProperty({ description: "이름", type: String, nullable: true })
  @IsOptional()
  @IsString()
  name: string | null;

  @ApiProperty({ description: "유저 이미지", type: String, nullable: true })
  @IsOptional()
  @IsString()
  image: string | null;

  @ApiProperty({
    description: "권한",
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
