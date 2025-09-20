import { Prisma } from "@prisma/client";
import {
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";

// Prisma v6: $use 미들웨어 제거됨 → Extensions로 대체
export const createErrorMappingExtension = (logger: Logger) =>
  Prisma.defineExtension({
    name: "error-mapping-extension",
    query: {
      $allModels: {
        $allOperations: async ({ model, operation, args, query }) => {
          try {
            logger.log(`${model}.${operation}`);
            const result = await query(args);
            return result;
          } catch (e: any) {
            const code = e?.code as string | undefined;
            switch (code) {
              case "P2002":
                throw new ConflictException("중복 레코드(ex: Unique)");
              case "P2003":
                throw new ConflictException("데이터베이스 외래 키 제약 조건이 실패");
              case "P2025":
                throw new NotFoundException("일치하는 데이터를 찾을 수 없습니다.");
              case "P2004":
                throw new BadRequestException("값 범위 초과");
              case "P2005":
                throw new BadRequestException("잘못된 값");
              case "P2006":
                throw new BadRequestException("유효성 검사 오류");
              case "P2014":
                throw new InternalServerErrorException("트랜잭션이 실패");
              default:
                if (code) {
                  throw new BadRequestException(e?.message ?? "잘못된 요청");
                }
                throw new InternalServerErrorException("서버 내부 오류");
            }
          }
        },
      },
    },
  });
