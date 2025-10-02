import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/core/prisma/prisma.service";
import { AccountPayload } from "../interface/jwt.interface";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { ROLE_KEY } from "./auth.guard";

export const IS_PUBLIC_KEY = "isPublic";
export const REQUIRE_AUTH_KEY = "requireAuth";

/**
 * JWT 인증 Guard
 * - JWT 토큰 검증
 * - 사용자 존재 여부 확인
 * - 사용자 상태 확인 (ACTIVE만 허용)
 * - deletedAt 확인
 * - request.user에 사용자 정보 주입
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. @Public() 데코레이터가 있으면 인증 건너뛰기
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }

    // 2. @UseRoleGuard() 또는 @RequireAuth() 데코레이터가 있는지 확인
    const requiredRole = this.reflector.get<string>(ROLE_KEY, context.getHandler());
    const requireAuth = this.reflector.get<boolean>(REQUIRE_AUTH_KEY, context.getHandler());

    // RoleGuard나 RequireAuth가 없으면 인증 불필요 (Public)
    if (!requiredRole && !requireAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException("인증 토큰이 없습니다.");
    }

    try {
      // JWT 토큰 검증
      const payload = await this.jwtService.verifyAsync<AccountPayload>(token, {
        secret: this.configService.get<string>("ACCESS_JWT_SECRET"),
      });

      // DB에서 사용자 정보 조회
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          email: true,
          role: true,
          status: true,
          deletedAt: true,
        },
      });

      // 사용자 존재 확인
      if (!user) {
        throw new UnauthorizedException("사용자를 찾을 수 없습니다.");
      }

      // 삭제된 사용자 확인
      if (user.deletedAt) {
        throw new UnauthorizedException("삭제된 사용자입니다.");
      }

      // 사용자 상태 확인
      if (user.status !== "ACTIVE") {
        const statusMessages = {
          INACTIVE: "비활성화된 계정입니다.",
          SUSPENDED: "정지된 계정입니다.",
          BANNED: "차단된 계정입니다.",
        };
        throw new UnauthorizedException(
          statusMessages[user.status] || "사용할 수 없는 계정입니다.",
        );
      }

      // request.user에 사용자 정보 주입
      request.user = {
        sub: user.id,
        email: user.email,
        role: user.role.toLowerCase() as "user" | "admin",
      };

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.log(error);
      throw new UnauthorizedException("유효하지 않은 토큰입니다.");
    }
  }

  /**
   * 쿠키 또는 Authorization 헤더에서 토큰 추출
   */
  private extractToken(request: Request): string | null {
    // 1. 쿠키에서 토큰 확인
    if (request.cookies?.access_token) {
      return request.cookies.access_token;
    }

    // 2. Authorization 헤더에서 Bearer 토큰 확인
    const authHeader = request.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      return authHeader.substring(7);
    }

    return null;
  }
}
