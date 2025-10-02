import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { IPostCreate, IPostFindUnique, IPostFindMany, IPostUpdate } from "./post.interface";
import { PrismaService } from "src/core/prisma/prisma.service";
import { CommonService } from "src/common/utils/common.service";
import { Prisma, $Enums } from "@prisma/client";
import { createPaginationOptions } from "src/common/helpers/pagination.helper";

@Injectable()
export class PostService extends CommonService implements OnModuleInit {
  public static readonly MODULE_NAME = "게시판";
  private readonly logger = new Logger(PostService.name);

  // 필수 카테고리 목록
  private readonly REQUIRED_CATEGORIES: { name: string; type?: $Enums.InfoType }[] = [
    { name: "공지사항" },
    { name: "자유게시판" },
    { name: "질문답변" },
  ];

  constructor(private readonly prisma: PrismaService) {
    super({ NAME: PostService.MODULE_NAME });
  }

  async onModuleInit() {
    await this.initializeCategories();
  }

  /**
   * 필수 카테고리 초기화
   * - 존재하지 않는 카테고리만 생성
   */
  private async initializeCategories() {
    try {
      for (const category of this.REQUIRED_CATEGORIES) {
        const exists = await this.prisma.category.findFirst({
          where: {
            name: category.name,
            type: category.type ? category.type : $Enums.InfoType.POST,
          },
        });

        if (!exists) {
          await this.prisma.category.create({
            data: category,
          });
          this.logger.log(`✅ 카테고리 생성: ${category.name}`);
        } else this.logger.log(`✅ 카테고리 존재: ${category.name}`);
      }
      this.logger.log("✅ 게시판 카테고리 초기화 완료");
    } catch (error) {
      this.logger.error("❌ 카테고리 초기화 실패", error);
    }
  }

  /** Prisma Logic */
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
      ...createPaginationOptions({ page, take, sort }),
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
      where: {
        id,
      },
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
