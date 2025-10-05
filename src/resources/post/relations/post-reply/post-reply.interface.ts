import { PostReplyCreateDto } from "./dto/request/post-reply-create.dto";
import { PostReplyFindManyDto, PostReplyFindUniqueDto } from "./dto/request/post-reply-find.dto";
import { PostReplyUpdateDto } from "./dto/request/post-reply-update.dto";

/**
 * Service layer interfaces
 * 서비스 계층에서 사용하는 순수 타입 정의
 * DTO와 독립적으로 비즈니스 로직 계층의 계약 정의
 */

/** Create */
export type IPostReplyCreate = PostReplyCreateDto;

/** Find */
export type IPostReplyFindUnique = PostReplyFindUniqueDto;

export type IPostReplyFindMany = PostReplyFindManyDto;

/** Update */
export type IPostReplyUpdate = PostReplyUpdateDto;
