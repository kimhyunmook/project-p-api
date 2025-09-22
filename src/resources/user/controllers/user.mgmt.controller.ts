import { Body, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { Constant as CONSTANT } from "../user.constant";
import { UserService } from "../user.service";
import { UserFindManyDto } from "../dto/user-find.dto";
import {
  UserFindManyResponseDto,
  UserFindUniqueResponseDto,
} from "../dto/response/user-find-response.dto";
import { UserCreateDto } from "../dto/user-create.dto";
import { UserUpdateDto } from "../dto/user-update.dto";
import { ApiController } from "src/common/decorators/api.decorator";
import { IdOnlyResponseDto, NullDataResponseDto } from "src/common/dto/response.dto";
import { CommonController } from "src/common/utils/common.controller";

@ApiController("management/user")
export class UserMgmtController extends CommonController {
  constructor(private readonly service: UserService) {
    super(CONSTANT.NAME);
  }

  @Get(":id")
  async findUnique(@Param("id", ParseIntPipe) id: bigint): Promise<UserFindUniqueResponseDto> {
    const resource = await this.service.findUniqueAndThrow({ id });
    return this.responseData(this.FIND_UNIQUE, resource);
  }

  @Get()
  async findMany(@Query() query: UserFindManyDto): Promise<UserFindManyResponseDto> {
    const { resources, meta } = await this.service.fidnMany(query);
    return this.responseData(this.FIND_MANY, resources, meta);
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<IdOnlyResponseDto> {
    const { id } = await this.service.create(body);
    return this.responseData(this.CREATE, { id });
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UserUpdateDto,
  ): Promise<NullDataResponseDto> {
    await this.service.update(id, body);
    return this.responseData(this.UPDATE, null);
  }

  @Delete(":id")
  async softDelete(@Param("id") id: number): Promise<NullDataResponseDto> {
    await this.service.softDelete(id);
    return this.responseData(this.DELETE, null);
  }
}
