import { OmitType } from "@nestjs/swagger";
import { PostReplyModel } from "../../models/post-reply.model";
import { ResponseDto } from "src/common/dto/response.dto";
import { ListResponseDto } from "src/common/dto/list-response.dto";

class PostReplyResponseData extends OmitType(PostReplyModel, []) {}

/** Unique */
export class PostReplyFindUniqueResponseDto extends ResponseDto {
  data: PostReplyResponseData;
}

/** List */
export class PostReplyFindManyResponseDto extends ListResponseDto {
  data: PostReplyResponseData[];
}
