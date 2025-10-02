import { PickType } from "@nestjs/swagger";
import { PostModel } from "../../models/post.model";
import { IPostFindUnique, IPostFindMany } from "../../post.interface";
import { createPaginationDto } from "src/common/helpers/find-pagination.dto";
import { CREATED_AT } from "src/common/enums/created-at.enum";

/** Unique */
export class PostFindUniqueDto
  extends PickType(PostModel, ["id"])
  implements IPostFindUnique {}

/** List */
export class PostFindManyDto
  extends createPaginationDto([CREATED_AT])
  implements IPostFindMany {}
