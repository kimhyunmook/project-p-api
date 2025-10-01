import { Body, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SigninDto, SingupDto } from "./dto/sign.dto";
import { ApiController } from "src/common/decorators/api-controller.decorator";
import { ApiDocs } from "src/common/decorators/api-docs-option.decorator";
import { Response } from "express";
import { SignInResponseDto } from "./dto/response/sign-response.dto";
import { CommonController } from "src/common/utils/common.controller";
import { ConfigService } from "@nestjs/config";
import { IdOnlyResponseDto } from "src/common/dto/response.dto";

@ApiController("auth")
export class AuthController extends CommonController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super("Auth");
  }

  @ApiDocs({ method: "POST", endpoint: "signup", summary: "회원가입" })
  async signup(@Body() body: SingupDto): Promise<IdOnlyResponseDto> {
    const { id } = await this.authService.signUp(body);
    return this.responseData("회원가입", { id });
  }

  @ApiDocs({ method: "POST", endpoint: "signin", summary: "로그인" })
  async signin(@Body() body: SigninDto, @Res() res: Response): Promise<SignInResponseDto> {
    const { accessToken } = await this.authService.signIn(body.email, body.password);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // https 환경에서만
      sameSite: "lax", // CSRF 방어
      maxAge: this.configService.get<number>("ACCESS_TOKEN_EXPIRE", { infer: true }) * 1000, // 쿠키 만료 시간 설정
    });

    return this.responseData("로그인 됐습니다.", { accessToken });
  }
}
