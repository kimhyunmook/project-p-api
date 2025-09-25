import { UserFindManyDto, UserFindUniqueDto } from "./dto/user-find.dto";
import { UserUpdateDto } from "./dto/user-update.dto";

/** find */
export interface IUserFindUnique extends UserFindUniqueDto {}
export interface IUserFindMany extends UserFindManyDto {}

/** update */
export interface IUserUpdate extends UserUpdateDto {}

/** delete */
