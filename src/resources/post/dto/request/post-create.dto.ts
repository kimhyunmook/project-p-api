import { PostModel } from "../../models/post.model";
import { IPostCreate } from "../../post.interface";
import { CreateDtoFromModel } from "src/common/helpers/create-from-model.dto";

export class PostCreateDto
  extends CreateDtoFromModel({
    model: PostModel,
    pick: ["title", "content", "published", "authorId"],
    optional: ["categoryId"],
  })
  implements IPostCreate {}
