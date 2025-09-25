import { IntersectionType, PickType } from "@nestjs/swagger";
import { UserModel } from "../models/user.model";
import { IUserFindUnique, IUserFindMany } from "../user.type";
import { createPaginationDto } from "src/common/helpers/find-pagination.dto";
import { CREATED_AT } from "src/common/enums/created-at.enum";

export class UserFindUniqueDto
  extends IntersectionType(PickType(UserModel, ["id"]))
  implements IUserFindUnique {}

export class UserFindManyDto extends createPaginationDto([CREATED_AT]) implements IUserFindMany {}
