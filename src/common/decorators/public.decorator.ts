import { SetMetadata } from "@nestjs/common";
import { IS_PUBLIC_KEY } from "../guards/jwt-auth.guard";

/**
 * Public 데코레이터
 * - 인증이 필요 없는 엔드포인트에 사용
 * - JwtAuthGuard를 건너뜀
 *
 * @example
 * @Public()
 * @Get('public')
 * getPublicData() {
 *   return 'This is public';
 * }
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
