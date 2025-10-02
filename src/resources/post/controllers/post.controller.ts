import { Body, Param, ParseIntPipe, Query } from "@nestjs/common";
import { PostService } from "../post.service";
import {
  IdOnlyResponseDto,
  NullDataResponseDto,
} from "src/common/dto/response.dto";
import { CommonController } from "src/common/utils/common.controller";
import { ApiController } from "src/common/decorators/api-controller.decorator";
import { ApiDocs } from "src/common/decorators/api-docs-option.decorator";
import { PostCreateDto } from "../dto/request/post-create.dto";
import { PostUpdateDto } from "../dto/request/post-update.dto";
import { PostFindManyDto } from "../dto/request/post-find.dto";
import {
  PostFindManyResponseDto,
  PostFindUniqueResponseDto,
} from "../dto/response/post-find-response.dto";

@ApiController("management/post")
export class PostController extends CommonController {
  constructor(private readonly service: PostService) {
    super(PostService.MODULE_NAME);
  }

  @ApiDocs({ endpoint: ":id", summary: `${PostService.MODULE_NAME} 상세 조회` })
  async findUnique(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<PostFindUniqueResponseDto> {
    const res = await this.service.findUnique({ id });
    return this.responseData(this.FIND_UNIQUE, res);
  }

  @ApiDocs({ summary: `${PostService.MODULE_NAME} 목록 조회` })
  async findMany(
    @Query() query: PostFindManyDto,
  ): Promise<PostFindManyResponseDto> {
    const { resources, meta } = await this.service.fidnMany(query);
    return this.responseData(this.FIND_MANY, resources, meta);
  }

  @ApiDocs({ method: "POST", summary: `${PostService.MODULE_NAME} 생성` })
  async create(@Body() body: PostCreateDto): Promise<IdOnlyResponseDto> {
    const { id } = await this.service.create(body);
    return this.responseData(this.CREATE, { id });
  }

  @ApiDocs({
    method: "PATCH",
    endpoint: ":id",
    summary: `${PostService.MODULE_NAME} 수정`,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: PostUpdateDto,
  ): Promise<NullDataResponseDto> {
    await this.service.update({ ...body, id });
    return this.responseData(this.UPDATE);
  }

  @ApiDocs({
    method: "DELETE",
    endpoint: ":id",
    summary: `${PostService.MODULE_NAME} 삭제`,
  })
  async softDelete(@Param("id") id: number): Promise<NullDataResponseDto> {
    await this.service.softDelete(id);
    return this.responseData(this.DELETE);
  }
}
