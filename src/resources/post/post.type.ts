import { PostCreateDto } from "./dto/request/post-create.dto";
import { PostFindManyDto, PostFindUniqueDto } from "./dto/request/post-find.dto";
import { PostUpdateDto } from "./dto/request/post-update.dto";

/** create */
export interface IPostCreate extends PostCreateDto {}

/** find */
export interface IPostFindUnique extends PostFindUniqueDto {}
export interface IPostFindMany extends PostFindManyDto {}

/** update */
export interface IPostUpdate extends PostUpdateDto {}
