import { Module } from "@nestjs/common";
import { PrismaModule } from "./core/prisma/prisma.module";
import { UserModule } from "./resources/user/user.module";
import { AppConfigModule } from "./core/config/app-config.module";
import { AuthModule } from "./resources/auth/auth.module";

@Module({
  imports: [AppConfigModule, PrismaModule, AuthModule, UserModule],
})
export class AppModule {}
