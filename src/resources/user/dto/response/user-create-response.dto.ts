import { OmitType } from "@nestjs/swagger";
import { UserModel } from "../../models/user.model";
import { ResponseDto } from "@utils/.boilerplate/dto/response.dto";

export class UserCreateResponseDto extends ResponseDto {
  data: UserCreateData;
}

class UserCreateData extends OmitType(UserModel, []) {}
