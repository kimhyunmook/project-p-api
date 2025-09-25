import { Injectable } from "@nestjs/common";
import { IPostCreate, IPostFindUnique, IPostFindMany, IPostUpdate } from "./post.type";
import { PrismaService } from "src/core/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { CommonSerivce } from "src/common/utils/common.service";
import { Constant } from "./post.constant";

@Injectable()
export class PostService extends CommonSerivce {
  constructor(private readonly prisma: PrismaService) {
    super(Constant);
  }

  async create(data: IPostCreate) {
    return this.prisma.post.create({ data });
  }

  async findUnique(data: IPostFindUnique) {
    return this.prisma.post.findUnique({
      where: {
        ...data,
      },
    });
  }

  async fidnMany({ page, take, sort, ...rest }: IPostFindMany) {
    const option: Prisma.PostFindManyArgs = {
      where: { ...rest },
      take,
      skip: (page - 1) * take,
      orderBy: (() => {
        switch (sort) {
          default:
            return { createdAt: "desc" };
        }
      })(),
    };

    const [resources, totalCount] = await this.prisma.$transaction([
      this.prisma.post.findMany(option),
      this.prisma.post.count({ where: option.where }),
    ]);

    const meta = this.getMetaData({
      page,
      take,
      totalCount,
    });

    return { resources, meta };
  }

  async update(data: IPostUpdate) {
    const { id, ...rest } = data;
    return this.prisma.post.update({
      where: { id },
      data: {
        ...rest,
      },
    });
  }

  async softDelete(id: number) {
    return this.prisma.post.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
