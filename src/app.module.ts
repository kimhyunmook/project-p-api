import { Module } from "@nestjs/common";
import { PrismaModule } from "./core/prisma/prisma.module";
import { UserModule } from "./resources/user/user.module";
import { AppConfigModule } from "./core/config/app-config.module";
import { AuthModule } from "./resources/auth/auth.module";
import { PostModule } from "./resources/post/post.module";
import { LoggerModule } from "./core/logger/logger.module";
import { SwaggerModule } from "./core/swagger/swagger.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./common/guards/jwt-auth.guard";
import { RoleGuard } from "./common/guards/auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    LoggerModule,
    AppConfigModule,
    PrismaModule,
    SwaggerModule,
    AuthModule,
    UserModule,
    PostModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const expireSeconds = configService.get<number>("ACCESS_TOKEN_EXPIRE");
        return {
          secret: configService.get<string>("ACCESS_JWT_SECRET"),
          signOptions: {
            expiresIn: `${expireSeconds}s`, // 초 단위 문자열로 변환 (3600 -> "3600s")
          },
        };
      },
      global: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
