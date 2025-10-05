import { ApiProperty } from "@nestjs/swagger";
import { ResponseDto } from "src/common/dto/response.dto";

export class SignInData {
  @ApiProperty({ description: "access token", type: String })
  accessToken: string;

  //   @ApiProperty({ description: "refresh token", type: String })
  //   refreshToken: string;
}

export class SignInResponseDto extends ResponseDto {
  @ApiProperty({ description: "로그인 응답 데이터", type: SignInData })
  data: SignInData;
}
