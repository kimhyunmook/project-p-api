import { OmitType } from "@nestjs/swagger";
import { UserModel } from "../../models/user.model";
import { ResponseDto, ResponseWithMetadataDto } from "@utils/.boilerplate/dto/response.dto";

export class UserFindUniqueResponseDto extends ResponseDto {
  data: UserFindUniqueData;
}
class UserFindUniqueData extends OmitType(UserModel, []) {}

export class UserFindManyResponseDto extends ResponseWithMetadataDto {
  data: UserFindManyData[];
}
class UserFindManyData extends OmitType(UserModel, []) {}
