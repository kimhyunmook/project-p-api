import { Body, Param, ParseIntPipe, Query } from "@nestjs/common";
import { Constant as CONSTANT } from "../pet.constant";
import { PetService } from "../pet.service";
import { IdOnlyResponseDto, NullDataResponseDto } from "src/common/dto/response.dto";
import { CommonController } from "src/common/utils/common.controller";
import { ApiController } from "src/common/decorators/api-controller.decorator";
import { ApiDocs } from "src/common/decorators/api-docs-option.decorator";
import {
  PetCreateDto,
  PetUpdateDto,
  PetFindManyDto,
  PetFindManyResponseDto,
  PetFindUniqueResponseDto,
} from "../dto/pet.dto";

@ApiController("management/pet")
export class PetController extends CommonController {
  constructor(private readonly service: PetService) {
    super(CONSTANT.NAME);
  }

  @ApiDocs({ endpoint: ":id", summary: `${CONSTANT.NAME} 상세 조회` })
  async findUnique(@Param("id", ParseIntPipe) id: number): Promise<PetFindUniqueResponseDto> {
    const res = await this.service.findUnique({ id });
    return this.responseData(this.FIND_UNIQUE, res);
  }

  @ApiDocs({ summary: `${CONSTANT.NAME} 목록 조회` })
  async findMany(@Query() query: PetFindManyDto): Promise<PetFindManyResponseDto> {
    const { resources, meta } = await this.service.fidnMany(query);
    return this.responseData(this.FIND_MANY, resources, meta);
  }

  @ApiDocs({ method: "POST", summary: `${CONSTANT.NAME} 생성` })
  async create(@Body() body: PetCreateDto): Promise<IdOnlyResponseDto> {
    const { id } = await this.service.create(body);
    return this.responseData(this.CREATE, { id });
  }

  @ApiDocs({ method: "PATCH", endpoint: ":id", summary: `${CONSTANT.NAME} 수정` })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: PetUpdateDto,
  ): Promise<NullDataResponseDto> {
    await this.service.update({ ...body, id });
    return this.responseData(this.UPDATE);
  }

  @ApiDocs({ method: "DELETE", endpoint: ":id", summary: `${CONSTANT.NAME} 삭제` })
  async softDelete(@Param("id") id: number): Promise<NullDataResponseDto> {
    await this.service.softDelete(id);
    return this.responseData(this.DELETE);
  }
}
