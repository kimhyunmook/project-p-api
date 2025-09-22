import { OmitType } from "@nestjs/swagger";
import { UserModel } from "../../models/user.model";
import { ListResponseDto } from "src/common/dto/list-response.dto";
import { ResponseDto } from "src/common/dto/response.dto";

export class UserFindManyResponseDto extends ListResponseDto {
  data: UserFindManyData[];
}
class UserFindManyData extends OmitType(UserModel, []) {}

export class UserFindUniqueResponseDto extends ResponseDto {
  data: UserFindUniqueData;
}

class UserFindUniqueData extends OmitType(UserModel, []) {}
