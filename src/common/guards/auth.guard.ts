import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

// 역할을 메타데이터로 저장하기 위한 key
export const ROLE_KEY = "role";

// RoleGuard
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 컨트롤러/핸들러에 설정된 role 가져오기
    const requiredRole = this.reflector.get<string>(ROLE_KEY, context.getHandler());
    if (!requiredRole) throw new ForbiddenException(`권한이 없습니다`);

    const request = context.switchToHttp().getRequest();
    const user = request.user; // JWT에서 붙여진 user 정보

    if (!user) throw new ForbiddenException("사용자 정보가 없습니다.");

    if (user.role !== requiredRole) {
      throw new ForbiddenException(`권한이 없습니다. 필요한 role: ${requiredRole}`);
    }

    return true;
  }
}
