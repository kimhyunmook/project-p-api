import { SetMetadata } from "@nestjs/common";
import { ROLE_KEY } from "../guards/auth.guard";

/**
 * Role 데코레이터
 * - 특정 role만 접근 가능하도록 제한
 * - JwtAuthGuard와 RoleGuard가 모두 적용되어야 함
 *
 * @example
 * @UseRoleGuard('admin')
 * @Delete(':id')
 * deleteUser(@Param('id') id: number) {
 *   return this.userService.delete(id);
 * }
 */
export const UseRoleGuard = (role: "user" | "admin") => SetMetadata(ROLE_KEY, role);
