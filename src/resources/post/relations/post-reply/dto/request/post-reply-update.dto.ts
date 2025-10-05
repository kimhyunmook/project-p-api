import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from "@nestjs/swagger";
import { PostReplyCreateDto } from "./post-reply-create.dto";
import { PostReplyModel } from "../../models/post-reply.model";
import { IPostReplyUpdate } from "../../post-reply.interface";

export class PostReplyUpdateDto
  extends IntersectionType(
    PickType(PostReplyModel, ["id"]),
    OmitType(PartialType(PostReplyCreateDto), []),
  )
  implements IPostReplyUpdate {}
