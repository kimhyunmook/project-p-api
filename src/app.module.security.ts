import { Module } from "@nestjs/common";
import { PrismaModule } from "./core/prisma/prisma.module";
import { UserModule } from "./resources/user/user.module";
import { AppConfigModule } from "./core/config/app-config.module";
import { AuthModule } from "./resources/auth/auth.module";
import { PostModule } from "./resources/post/post.module";
import { LoggerModule } from "./core/logger/logger.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./common/guards/jwt-auth.guard";
import { RoleGuard } from "./common/guards/auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { throttlerConfig } from "./common/guards/throttler.config";

@Module({
  imports: [
    LoggerModule,
    AppConfigModule,
    PrismaModule,
    AuthModule,
    UserModule,
    PostModule,

    // JWT 모듈 - 전역 설정
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const expireSeconds = configService.get<number>("ACCESS_TOKEN_EXPIRE");
        return {
          secret: configService.get<string>("ACCESS_JWT_SECRET"),
          signOptions: {
            expiresIn: `${expireSeconds}s`,
          },
        };
      },
      global: true,
    }),

    // Rate Limiting - Brute Force 공격 방어
    ThrottlerModule.forRoot(throttlerConfig),
  ],
  providers: [
    // 전역 Guard 설정 (순서 중요!)
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // 1. Rate Limiting (가장 먼저)
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // 2. JWT 인증
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard, // 3. Role 권한
    },
  ],
})
export class AppModule {}
