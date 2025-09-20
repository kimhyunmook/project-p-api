import { IntersectionType, PickType } from "@nestjs/swagger";
import { UserModel } from "../models/user.model";
import { IUserFindUnique, IUserFindMany } from "../user.type";
import { createPaginationDto } from "src/common/helpers/find-pagination.dto";

export class UserFindUniqueDto
  extends IntersectionType(PickType(UserModel, ["id"]))
  implements IUserFindUnique {}
export class UserFindManyDto extends createPaginationDto([CREATED_AT]) implements IUserFindMany {}
