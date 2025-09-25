import { IntersectionType, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { PostCreateDto } from "./post-create.dto";
import { IPostUpdate } from "../../post.type";
import { PostModel } from "../../models/post.model";

export class PostUpdateDto
  extends IntersectionType(PickType(PostModel, ["id"]), OmitType(PartialType(PostCreateDto), []))
  implements IPostUpdate {}
