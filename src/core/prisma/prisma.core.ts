import { Prisma } from "@prisma/client";
import {
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { CustomLoggerService } from "../logger/custom-logger.service";

export const createErrorMappingExtension = (logger: CustomLoggerService) =>
  Prisma.defineExtension({
    name: "error-mapping-extension",
    query: {
      $allModels: {
        $allOperations: async ({ model, operation, args, query }) => {
          const startTime = Date.now();

          try {
            const result = await query(args);
            const duration = Date.now() - startTime;

            // 쿼리 로깅 (느린 쿼리만 - 100ms 이상)
            if (duration > 100) {
              logger.logQuery(`${model}.${operation}`, duration);
            }

            return result;
          } catch (e: unknown) {
            const duration = Date.now() - startTime;

            // Prisma 에러로 좁히기
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
              // 에러 로깅
              logger.error(
                `[Prisma ${e.code}] ${model}.${operation} failed`,
                JSON.stringify({ code: e.code, meta: e.meta, duration }),
                "PrismaError",
              );

              switch (e.code) {
                case "P2002":
                  throw new ConflictException("중복된 데이터가 존재합니다");
                case "P2003":
                  throw new ConflictException("외래 키 제약 조건 위반");
                case "P2025":
                  throw new NotFoundException("데이터를 찾을 수 없습니다");
                case "P2004":
                  throw new BadRequestException("값 범위 초과");
                case "P2005":
                  throw new BadRequestException("잘못된 값");
                case "P2006":
                  throw new BadRequestException("유효성 검사 오류");
                case "P2011":
                  throw new BadRequestException("필수 값이 누락되었습니다");
                case "P2012":
                  throw new BadRequestException("필수 제약 조건 누락");
                case "P2014":
                  throw new InternalServerErrorException("트랜잭션 실패");
                case "P2015":
                  throw new NotFoundException("관련 레코드를 찾을 수 없습니다");
                case "P2016":
                  throw new BadRequestException("쿼리 해석 오류");
                case "P2017":
                  throw new ConflictException("관계 제약 조건 위반");
                case "P2018":
                  throw new NotFoundException("필요한 연결 레코드를 찾을 수 없습니다");
                case "P2019":
                  throw new BadRequestException("입력 오류");
                case "P2020":
                  throw new BadRequestException("값이 범위를 벗어났습니다");
                case "P2021":
                  throw new InternalServerErrorException("테이블이 존재하지 않습니다");
                case "P2022":
                  throw new InternalServerErrorException("컬럼이 존재하지 않습니다");
                case "P2023":
                  throw new BadRequestException("일관성 없는 컬럼 데이터");
                case "P2024":
                  throw new InternalServerErrorException(
                    "연결 풀 시간 초과. 데이터베이스 연결을 확인하세요",
                  );
                case "P2034":
                  throw new ConflictException("트랜잭션 충돌");
                default:
                  logger.warn(`처리되지 않은 Prisma 에러 코드: ${e.code}`, "PrismaError");
                  throw new BadRequestException(e.message || "데이터베이스 오류");
              }
            } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
              logger.error(
                `알 수 없는 Prisma 에러: ${model}.${operation}`,
                e.message,
                "PrismaError",
              );
              throw new InternalServerErrorException("서버 내부 오류");
            } else if (e instanceof Prisma.PrismaClientValidationError) {
              logger.error(
                `Prisma 검증 오류: ${model}.${operation}`,
                e.message,
                "PrismaValidation",
              );
              throw new BadRequestException("잘못된 요청 데이터");
            } else {
              // Prisma 에러가 아닌 일반 예외
              logger.error(
                `일반 예외: ${model}.${operation}`,
                e instanceof Error ? e.stack || e.message : String(e),
                "DatabaseError",
              );
              throw new InternalServerErrorException(
                e instanceof Error ? e.message : "서버 내부 오류",
              );
            }
          }
        },
      },
    },
  });
