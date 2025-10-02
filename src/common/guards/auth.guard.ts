import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

// 역할을 메타데이터로 저장하기 위한 key
export const ROLE_KEY = "role";

/**
 * Role 기반 권한 Guard
 * - JwtAuthGuard 이후에 실행되어야 함
 * - request.user에 사용자 정보가 이미 주입되어 있어야 함
 * - 특정 role만 접근 가능하도록 제한
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 컨트롤러/핸들러에 설정된 role 가져오기
    const requiredRole = this.reflector.get<string>(ROLE_KEY, context.getHandler());

    // role이 설정되지 않았으면 통과 (인증만 필요한 경우)
    if (!requiredRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    // JwtAuthGuard에서 user를 주입했어야 함
    if (!user) {
      throw new ForbiddenException("인증이 필요합니다.");
    }

    // role 확인
    if (user.role !== requiredRole.toLowerCase()) {
      throw new ForbiddenException(`접근 권한이 없습니다. ${requiredRole} 권한이 필요합니다.`);
    }

    return true;
  }
}

// 하위 호환성을 위한 alias
export const AuthGuard = RoleGuard;
