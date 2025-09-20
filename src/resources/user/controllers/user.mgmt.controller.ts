import { Body, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { Constant as CONSTANT } from "../user.constant";
import { UserService } from "../user.service";
import { UserCreateResponseDto } from "../dto/response/user-create-response.dto";
import { UserFindManyDto } from "../dto/user-find.dto";
import {
  UserFindManyResponseDto,
  UserFindUniqueResponseDto,
} from "../dto/response/user-find-response.dto";
import { UserCreateDto } from "../dto/user-create.dto";
import { UserUpdateDto } from "../dto/user-update.dto";
import { ApiController } from "src/common/decorators/api.decorator";

@ApiController("management/user")
export class UserMgmtController {
  constructor(private readonly service: UserService) {}

  @Get(":id")
  async findUnique(@Param("id", ParseIntPipe) id: number): Promise<UserFindUniqueResponseDto> {
    return this.service.findUnique({ id });
  }

  @Get()
  async findMany(@Query() query: UserFindManyDto): Promise<UserFindManyResponseDto> {
    return this.service.fidnMany(query);
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
  @ApiInformation(`${CONSTANT.NAME} 삭제`, true)
  async softDelete(@Param("id") id: number): Promise<NoDataResponseDto> {
    return this.service.softDelete(id);
  }
}
