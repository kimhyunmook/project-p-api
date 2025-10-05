import { PostReplyModel } from "../../models/post-reply.model";
import { IPostReplyCreate } from "../../post-reply.interface";
import { CreateDtoFromModel } from "src/common/helpers/create-from-model.dto";

export class PostReplyCreateDto
  extends CreateDtoFromModel({
    model: PostReplyModel,
    pick: ["postId", "content", "status"],
    optional: [],
  })
  implements IPostReplyCreate {}
