import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";

/**
 * Security 설정
 * - Helmet (보안 헤더)
 * - CORS (교차 출처 리소스 공유)
 */
export function setupSecurity(app: NestExpressApplication, configService: ConfigService) {
  // Helmet 설정
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
      crossOriginEmbedderPolicy: false, // Swagger 호환성
    }),
  );

  // CORS 설정
  const allowedOrigins = configService.get<string>("LOCALHOST_URL")?.split(",") || [];

  app.enableCors({
    origin: (origin, callback) => {
      // origin이 없으면 (같은 서버 요청) 허용
      if (!origin) return callback(null, true);

      // 허용된 origin만 접근 가능
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy: Not allowed origin"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    maxAge: 3600, // preflight 캐시 시간
  });

  // Trust proxy 설정
  app.set("trust proxy", true);
}
