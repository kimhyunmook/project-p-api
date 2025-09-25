import { OmitType } from "@nestjs/swagger";
import { PostModel } from "../../models/post.model";
import { ResponseDto } from "src/common/dto/response.dto";
import { ListResponseDto } from "src/common/dto/list-response.dto";

/** Unique */
export class PostFindUniqueResponseDto extends ResponseDto {
    data: PostFindUniqueData;
}
class PostFindUniqueData extends OmitType(PostModel, []) {}

/** List */
export class PostFindManyResponseDto extends ListResponseDto {
    data: PostFindManyData[];
}
class PostFindManyData extends OmitType(PostModel, []) {}
