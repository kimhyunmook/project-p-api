import { UserModel } from "../models/user.model";
import { IUserCreate } from "../user.type";
import { CreateDtoFromModel } from "src/common/helpers/create-from-model.dto";

export class UserCreateDto
  extends CreateDtoFromModel({
    model: UserModel,
    pick: ["email", "password", "role", "status"],
    optional: [],
  })
  implements IUserCreate {}
