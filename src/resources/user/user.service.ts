import { Injectable, NotFoundException } from "@nestjs/common";
import { IUserCreate, IUserFindUnique, IUserFindMany, IUserUpdate } from "./user.type";
import { PrismaService } from "src/core/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { CommonSerivce } from "src/common/utils/common.service";
import { Constant } from "./user.constant";

@Injectable()
export class UserService extends CommonSerivce {
  constructor(private readonly repository: PrismaService) {
    super(Constant);
  }

  async create(data: IUserCreate) {
    return this.repository.user.create({ data });
  }

  async findUniqueAndThrow({ id, ...rest }: IUserFindUnique) {
    const resource = await this.repository.user.findUniqueOrThrow({ where: { id, ...rest } });
    if (!resource) throw new NotFoundException(this.Name);
    return resource;
  }

  async fidnMany({ page, take, sort, ...rest }: IUserFindMany) {
    const option: Prisma.UserFindManyArgs = {
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

    const [resources, totalCount] = await this.repository.$transaction([
      this.repository.user.findMany(option),
      this.repository.user.count({ where: option.where }),
    ]);

    const meta = this.getMetaData({
      page,
      take,
      totalCount,
    });

    return { resources, meta };
  }

  async update(id: number, data: IUserUpdate) {
    return this.repository.user.update({ where: { id }, data });
  }

  async softDelete(id: number) {
    return this.repository.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
