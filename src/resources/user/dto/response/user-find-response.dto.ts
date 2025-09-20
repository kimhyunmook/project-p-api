import { OmitType } from "@nestjs/swagger";
import { UserModel } from "../../models/user.model";
import { ListResponseDto } from "src/common/dto/list-response.dto";

export class UserFindManyResponseDto extends ListResponseDto<UserFindManyData[]> {
  declare data: UserFindManyData[];
}
class UserFindManyData extends OmitType(UserModel, []) {}
