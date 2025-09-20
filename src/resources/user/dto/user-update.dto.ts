import { OmitType, PartialType } from "@nestjs/swagger";
import { UserCreateDto } from "./user-create.dto";
import { IUserUpdate } from "../user.type";

export class UserUpdateDto
  extends OmitType(PartialType(UserCreateDto), [])
  implements IUserUpdate {}
