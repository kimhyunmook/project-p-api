import { Body, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { Constant as CONSTANT } from "../user.constant";
import { UserService } from "../user.service";
import { UserCreateResponseDto } from "../dto/response/user-create-response.dto";
import { UserFindManyDto } from "../dto/user-find.dto";
import { UserFindManyResponseDto } from "../dto/response/user-find-response.dto";
import { UserCreateDto } from "../dto/user-create.dto";
import { UserUpdateDto } from "../dto/user-update.dto";
import { ApiController } from "src/common/decorators/api.decorator";
import { IdOnlyResponseDto } from "src/common/dto/response.dto";
import { CommonController } from "src/common/utils/common.controller";

@ApiController("management/user")
export class UserMgmtController extends CommonController {
  constructor(private readonly service: UserService) {
    super(CONSTANT.NAME);
  }

  @Get(":id")
  async findUnique(@Param("id", ParseIntPipe) id: number): Promise<IdOnlyResponseDto> {
    const { id: resId } = await this.service.findUniqueAndThrow({ id });
    return this.responseData(this.FIND_UNIQUE, { id: resId });
  }

  @Get()
  async findMany(@Query() query: UserFindManyDto): Promise<UserFindManyResponseDto> {
    const { resources, meta } = await this.service.fidnMany(query);
    return this.responseData(this.FIND_MANY, resources, meta);
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<UserCreateResponseDto> {
    return this.service.create(body);
  }

  @Put(":id")
  @ApiInformation(`${CONSTANT.NAME} 수정`, true)
  async update(@Param("id", ParseIntPipe) id: number, @Body() body: UserUpdateDto) {
    return this.service.update(id, body);
  }

  @Delete(":id")
  async softDelete(@Param("id") id: number): Promise<NoDataResponseDto> {
    return this.service.softDelete(id);
  }
}
