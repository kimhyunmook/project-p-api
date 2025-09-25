import { PostModel } from "../../models/post.model";
import { IPostCreate } from "../../post.type";
import { CreateDtoFromModel } from "src/common/helpers/create-from-model.dto";

export class PostCreateDto
  extends CreateDtoFromModel({
    model: PostModel,
    pick: ["content", "title", "authorId"],
    optional: ["categoryId"],
  })
  implements IPostCreate {}
