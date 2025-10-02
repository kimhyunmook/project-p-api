import { SetMetadata } from "@nestjs/common";
import { REQUIRE_AUTH_KEY } from "../guards/jwt-auth.guard";

/**
 * RequireAuth 데코레이터
 * - 인증이 필요하지만 특정 role은 필요 없을 때 사용
 * - @UseRoleGuard()를 사용하면 자동으로 인증도 필요
 *
 * @example
 * @RequireAuth()
 * @Get('profile')
 * getProfile(@User() user: JwtPayload) {
 *   return this.userService.findOne(user.sub);
 * }
 */
export const RequireAuth = () => SetMetadata(REQUIRE_AUTH_KEY, true);
