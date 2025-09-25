import { ApiProperty } from "@nestjs/swagger";
import { ResponseDto } from "src/common/dto/response.dto";

export class SignInResponseDto extends ResponseDto {
  data: SignInData;
}

class SignInData {
  @ApiProperty({ description: "access token", type: String })
  accessToken: string;

  //   @ApiProperty({ description: "refresh token", type: String })
  //   refreshToken: string;
}
