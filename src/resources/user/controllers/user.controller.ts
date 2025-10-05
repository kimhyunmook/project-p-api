import { Body, Param, ParseIntPipe } from "@nestjs/common";
import { Constant as CONSTANT } from "../user.constant";
import { UserService } from "../user.service";
import { UserFindUniqueResponseDto } from "../dto/response/user-find-response.dto";
import { UserUpdateDto } from "../dto/user-update.dto";
import { ApiController } from "src/common/decorators/api-controller.decorator";
import { NullDataResponseDto } from "src/common/dto/response.dto";
import { CommonController } from "src/common/utils/common.controller";
import { ApiDocs } from "src/common/decorators/api-docs-option.decorator";
import { Account } from "src/common/decorators/user.decorator";
import { AccountPayload } from "src/common/interface/jwt.interface";

@ApiController("user")
export class UserController extends CommonController {
  constructor(private readonly service: UserService) {
    super(CONSTANT.NAME);
  }

  @ApiDocs({ endpoint: "own", summary: "내 정보 조회", role: "user" })
  async findUnique(@Account() account: AccountPayload): Promise<UserFindUniqueResponseDto> {
    const resource = await this.service.findUniqueAndThrow({ id: account.sub });
    return this.responseData(this.FIND_UNIQUE, resource);
  }

  @ApiDocs({ method: "PATCH", endpoint: ":id", summary: `내 정보 수정`, role: "user" })
  async update(
    @Body() body: UserUpdateDto,
    @Account() account: AccountPayload,
  ): Promise<NullDataResponseDto> {
    await this.service.update(account.sub, body);
    return this.responseData(this.UPDATE);
  }

  @ApiDocs({ method: "DELETE", endpoint: ":id", summary: `회원 탈퇴`, role: "user" })
  async softDelete(@Account() account: AccountPayload): Promise<NullDataResponseDto> {
    await this.service.softDelete(account.sub);
    return this.responseData(this.DELETE);
  }
}
