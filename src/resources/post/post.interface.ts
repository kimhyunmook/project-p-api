import { PostCreateDto } from "./dto/request/post-create.dto";
import { PostFindManyDto, PostFindUniqueDto } from "./dto/request/post-find.dto";
import { PostUpdateDto } from "./dto/request/post-update.dto";

/**
 * Service layer interfaces
 * 서비스 계층에서 사용하는 순수 타입 정의
 * DTO와 독립적으로 비즈니스 로직 계층의 계약 정의
 */

/** Create */
export type IPostCreate = PostCreateDto;

/** Find */
export type IPostFindUnique = PostFindUniqueDto;

export type IPostFindMany = PostFindManyDto;

/** Update */
export type IPostUpdate = PostUpdateDto;
