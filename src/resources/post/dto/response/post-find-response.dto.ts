import { OmitType } from "@nestjs/swagger";
import { PostModel } from "../../models/post.model";
import { ResponseDto } from "src/common/dto/response.dto";
import { ListResponseDto } from "src/common/dto/list-response.dto";

class PostResponseData extends OmitType(PostModel, []) {}

/** Unique */
export class PostFindUniqueResponseDto extends ResponseDto {
  data: PostResponseData;
}

/** List */
export class PostFindManyResponseDto extends ListResponseDto {
  data: PostResponseData[];
}
