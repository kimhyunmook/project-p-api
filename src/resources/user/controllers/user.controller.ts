import { Body, Param, ParseIntPipe } from "@nestjs/common";
import { Constant as CONSTANT } from "../user.constant";
import { UserService } from "../user.service";
import { UserFindUniqueResponseDto } from "../dto/response/user-find-response.dto";
import { UserUpdateDto } from "../dto/user-update.dto";
import { ApiController } from "src/common/decorators/api-controller.decorator";
import { NullDataResponseDto } from "src/common/dto/response.dto";
import { CommonController } from "src/common/utils/common.controller";
import { ApiDocs } from "src/common/decorators/api-docs-option.decorator";
import { User } from "src/common/decorators/user.decorator";
import { JwtPayload } from "src/common/interface/jwt.interface";

@ApiController("user")
export class UserController extends CommonController {
  constructor(private readonly service: UserService) {
    super(CONSTANT.NAME);
  }

  @ApiDocs({ endpoint: "own", summary: "내 정보 조회", role: "USER" })
  async findUnique(@User() user: JwtPayload): Promise<UserFindUniqueResponseDto> {
    const resource = await this.service.findUniqueAndThrow({ id: user.sub });
    return this.responseData(this.FIND_UNIQUE, resource);
  }

  @ApiDocs({ method: "PATCH", endpoint: ":id", summary: `${CONSTANT.NAME} 수정`, role: "USER" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UserUpdateDto,
  ): Promise<NullDataResponseDto> {
    await this.service.update(id, body);
    return this.responseData(this.UPDATE);
  }

  @ApiDocs({ method: "DELETE", endpoint: ":id", summary: `${CONSTANT.NAME} 탈퇴`, role: "USER" })
  async softDelete(@Param("id") id: number): Promise<NullDataResponseDto> {
    await this.service.softDelete(id);
    return this.responseData(this.DELETE);
  }
}
