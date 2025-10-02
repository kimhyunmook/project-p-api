import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from "@nestjs/swagger";
import { PostCreateDto } from "./post-create.dto";
import { PostModel } from "../../models/post.model";
import { IPostUpdate } from "../../post.interface";

export class PostUpdateDto
  extends IntersectionType(
    PickType(PostModel, ["id"]),
    OmitType(PartialType(PostCreateDto), []),
  )
  implements IPostUpdate {}
