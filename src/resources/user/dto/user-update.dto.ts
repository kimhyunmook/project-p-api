import { OmitType, PartialType } from "@nestjs/swagger";
import { IUserUpdate } from "../user.type";
import { UserModel } from "../models/user.model";

export class UserUpdateDto
  extends OmitType(PartialType(UserModel), [
    "id",
    "createdAt",
    "deletedAt",
    "lastLoginAt",
    "role",
    "updatedAt",
    "email",
    "status",
  ])
  implements IUserUpdate {}
