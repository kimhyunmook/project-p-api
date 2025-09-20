import { OmitType } from "@nestjs/swagger";
import { UserModel } from "../../models/user.model";
import { ResponseDto } from "src/common/dto/response.dto";

export class UserCreateResponseDto extends ResponseDto<UserCreateData> {
  declare data: UserCreateData;
}

class UserCreateData extends OmitType(UserModel, []) {}
