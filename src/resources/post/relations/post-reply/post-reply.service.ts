import { Injectable } from "@nestjs/common";
import {
  IPostReplyCreate,
  IPostReplyFindUnique,
  IPostReplyFindMany,
  IPostReplyUpdate,
} from "./post-reply.interface";
import { PrismaService } from "src/core/prisma/prisma.service";
import { CommonService } from "src/common/utils/common.service";
import { createPaginationOptions } from "src/common/helpers/pagination.helper";
import { Prisma } from "@prisma/client";

@Injectable()
export class PostReplyService extends CommonService {
  public static readonly MODULE_NAME = "PostReply";

  constructor(private readonly prisma: PrismaService) {
    super({ NAME: PostReplyService.MODULE_NAME });
  }

  async create(data: IPostReplyCreate) {
    return this.prisma.postReply.create({ data });
  }

  async findUnique(data: IPostReplyFindUnique) {
    return this.prisma.postReply.findUnique({
      where: {
        ...data,
      },
    });
  }

  async fidnMany({ page, take, sort, ...rest }: IPostReplyFindMany) {
    const option: Prisma.PostReplyFindManyArgs = {
      where: { ...rest },
      ...createPaginationOptions({ page, take, sort }),
    };

    const [resources, totalCount] = await this.prisma.$transaction([
      this.prisma.postReply.findMany(option),
      this.prisma.postReply.count({ where: option.where }),
    ]);

    const meta = this.getMetaData({
      page,
      take,
      totalCount,
    });

    return { resources, meta };
  }

  async update(data: IPostReplyUpdate) {
    const { id, ...rest } = data;
    return this.prisma.postReply.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });
  }

  async softDelete(id: number) {
    return this.prisma.postReply.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
