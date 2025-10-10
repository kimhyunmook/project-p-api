import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { IPetCreate, IPetFindUnique, IPetFindMany, IPetUpdate } from "./pet.interface";
import { PrismaService } from "src/core/prisma/prisma.service";
import { CommonService } from "src/common/utils/common.service";
import { createPaginationOptions } from "src/common/helpers/pagination.helper";
import { Prisma } from "@prisma/client";
import { CustomLoggerService } from "src/core/logger/custom-logger.service";

@Injectable()
export class PetService extends CommonService {
  public static readonly MODULE_NAME = "애완동물";

  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: CustomLoggerService,
  ) {
    super({ NAME: PetService.MODULE_NAME });
  }

  async create(data: IPetCreate) {
    // owner 존재 확인
    const owner = await this.prisma.user.findUnique({
      where: { id: data.ownerId },
    });
    if (!owner) {
      throw new NotFoundException("사용자를 찾을 수 없습니다");
    }

    const pet = await this.prisma.pet.create({ data });

    this.logger.logBusiness("Pet 생성", {
      petId: pet.id,
      ownerId: data.ownerId,
      type: data.type,
    });

    return pet;
  }

  async findUnique(data: IPetFindUnique) {
    const pet = await this.prisma.pet.findUnique({
      where: {
        ...data,
        deletedAt: null, // 삭제되지 않은 것만
      },
    });

    if (!pet) {
      throw new NotFoundException("애완동물을 찾을 수 없습니다");
    }

    return pet;
  }

  async findMany({ page, take, sort, ...rest }: IPetFindMany) {
    const option: Prisma.PetFindManyArgs = {
      where: {
        ...rest,
        deletedAt: null, // 삭제되지 않은 것만 조회
      },
      ...createPaginationOptions({ page, take, sort }),
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

    // 존재 확인
    const pet = await this.prisma.pet.findUnique({
      where: { id },
    });

    if (!pet) {
      throw new NotFoundException("애완동물을 찾을 수 없습니다");
    }

    if (pet.deletedAt) {
      throw new ConflictException("이미 삭제된 애완동물입니다");
    }

    const updated = await this.prisma.pet.update({
      where: { id },
      data: { ...rest },
    });

    this.logger.logBusiness("Pet 수정", { petId: id });

    return updated;
  }

  async softDelete(id: number) {
    // 존재 확인
    const pet = await this.prisma.pet.findUnique({
      where: { id },
    });

    if (!pet) {
      throw new NotFoundException("애완동물을 찾을 수 없습니다");
    }

    if (pet.deletedAt) {
      throw new ConflictException("이미 삭제된 애완동물입니다");
    }

    const deleted = await this.prisma.pet.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    this.logger.logBusiness("Pet 삭제", { petId: id, ownerId: pet.ownerId });

    return deleted;
  }
}
