import { Injectable } from "@nestjs/common";
import { IPetCreate, IPetFindUnique, IPetFindMany, IPetUpdate } from "./pet.type";
import { PrismaService } from "src/core/prisma/prisma.service";
import { Constant } from "./pet.constant";
import { CommonService } from "src/common/utils/common.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class PetService extends CommonService {
  constructor(private readonly prisma: PrismaService) {
    super(Constant);
  }

  async create(data: IPetCreate) {
    return this.prisma.pet.create({ data });
  }

  async findUnique(data: IPetFindUnique) {
    return this.prisma.pet.findUnique({
      where: {
        ...data,
      },
    });
  }

  async fidnMany({ page, take, sort, ...rest }: IPetFindMany) {
    const option: Prisma.PetFindManyArgs = {
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
      this.prisma.pet.findMany(option),
      this.prisma.pet.count({ where: option.where }),
    ]);

    const meta = this.getMetaData({
      page,
      take,
      totalCount,
    });

    return { resources, meta };
  }

  async update(data: IPetUpdate) {
    const { id, ...rest } = data;
    return this.prisma.pet.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });
  }

  async softDelete(id: number) {
    return this.prisma.pet.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
