import { ThrottlerModuleOptions } from "@nestjs/throttler";

/**
 * Rate Limiting 설정
 * Brute Force 공격 방어
 */
export const throttlerConfig: ThrottlerModuleOptions = [
  {
    name: "short", // 짧은 시간 제한
    ttl: 1000, // 1초
    limit: 3, // 1초에 3번
  },
  {
    name: "medium", // 중간 시간 제한
    ttl: 10000, // 10초
    limit: 20, // 10초에 20번
  },
  {
    name: "long", // 긴 시간 제한
    ttl: 60000, // 1분
    limit: 100, // 1분에 100번
  },
];

/**
 * 엔드포인트별 커스텀 제한
 */
export const THROTTLE_SKIP_IF = {
  // 로그인 엔드포인트 - 엄격한 제한
  login: {
    ttl: 60000, // 1분
    limit: 5, // 1분에 5번만
  },

  // 회원가입 - 보통 제한
  signup: {
    ttl: 3600000, // 1시간
    limit: 3, // 1시간에 3번만
  },
};
