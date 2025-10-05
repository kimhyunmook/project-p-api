import { PickType } from "@nestjs/swagger";
import { PostReplyModel } from "../../models/post-reply.model";
import {
  IPostReplyFindUnique,
  IPostReplyFindMany,
} from "../../post-reply.interface";
import { createPaginationDto } from "src/common/helpers/find-pagination.dto";
import { CREATED_AT } from "src/common/enums/created-at.enum";

/** Unique */
export class PostReplyFindUniqueDto
  extends PickType(PostReplyModel, ["id"])
  implements IPostReplyFindUnique {}

/** List */
export class PostReplyFindManyDto
  extends createPaginationDto([CREATED_AT])
  implements IPostReplyFindMany {}
