import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { CreateDtoFromModel } from "src/common/helpers/create-from-model.dto";
import { UserModel } from "src/resources/user/models/user.model";

export class SingupDto extends CreateDtoFromModel({
  model: UserModel,
  pick: ["email", "password", "name"],
  optional: ["role"],
}) {}

export class SigninDto extends PickType(UserModel, ["email", "password"]) {}
