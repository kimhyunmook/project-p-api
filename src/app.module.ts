import { Module } from "@nestjs/common";
import { PrismaModule } from "./core/prisma/prisma.module";
import { UserModule } from "./resources/user/user.module";
import { AppConfigModule } from "./core/config/app-config.module";
import { AuthModule } from "./resources/auth/auth.module";
import { PostModule } from "./resources/post/post.module";
import { LoggerModule } from "./core/logger/logger.module";

@Module({
  imports: [LoggerModule, AppConfigModule, PrismaModule, AuthModule, UserModule, PostModule],
})
export class AppModule {}
