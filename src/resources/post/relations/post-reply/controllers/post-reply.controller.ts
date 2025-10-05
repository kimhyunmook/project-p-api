import { Body, Param, ParseIntPipe, Query } from "@nestjs/common";
import { PostReplyService } from "../post-reply.service";
import {
  NumberIdOnlyResponseDto,
  NullDataResponseDto,
} from "src/common/dto/response.dto";
import { CommonController } from "src/common/utils/common.controller";
import { ApiController } from "src/common/decorators/api-controller.decorator";
import { ApiDocs } from "src/common/decorators/api-docs-option.decorator";
import { PostReplyCreateDto } from "../dto/request/post-reply-create.dto";
import { PostReplyUpdateDto } from "../dto/request/post-reply-update.dto";
import { PostReplyFindManyDto } from "../dto/request/post-reply-find.dto";
import {
  PostReplyFindManyResponseDto,
  PostReplyFindUniqueResponseDto,
} from "../dto/response/post-reply-find-response.dto";

@ApiController("post-reply")
export class PostReplyController extends CommonController {
  constructor(private readonly service: PostReplyService) {
    super(PostReplyService.MODULE_NAME);
  }

  @ApiDocs({
    endpoint: ":id",
    summary: `${PostReplyService.MODULE_NAME} 상세 조회`,
  })
  async findUnique(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<PostReplyFindUniqueResponseDto> {
    const res = await this.service.findUnique({ id });
    return this.responseData(this.FIND_UNIQUE, res);
  }

  @ApiDocs({ summary: `${PostReplyService.MODULE_NAME} 목록 조회` })
  async findMany(
    @Query() query: PostReplyFindManyDto,
  ): Promise<PostReplyFindManyResponseDto> {
    const { resources, meta } = await this.service.fidnMany(query);
    return this.responseData(this.FIND_MANY, resources, meta);
  }

  @ApiDocs({ method: "POST", summary: `${PostReplyService.MODULE_NAME} 생성` })
  async create(
    @Body() body: PostReplyCreateDto,
  ): Promise<NumberIdOnlyResponseDto> {
    const { id } = await this.service.create(body);
    return this.responseData(this.CREATE, { id });
  }

  @ApiDocs({
    method: "PATCH",
    endpoint: ":id",
    summary: `${PostReplyService.MODULE_NAME} 수정`,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: PostReplyUpdateDto,
  ): Promise<NullDataResponseDto> {
    await this.service.update({ ...body, id });
    return this.responseData(this.UPDATE);
  }

  @ApiDocs({
    method: "DELETE",
    endpoint: ":id",
    summary: `${PostReplyService.MODULE_NAME} 삭제`,
  })
  async softDelete(@Param("id") id: number): Promise<NullDataResponseDto> {
    await this.service.softDelete(id);
    return this.responseData(this.DELETE);
  }
}
