import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().default(80),
        SALT_ROUNDS: Joi.number().required(),
        ACCESS_TOKEN_EXPIRE: Joi.number().required(),
      }),
      validationOptions: {
        abortEarly: true, // 첫 번째 오류 발생 시 멈춤
      },
    }),
  ],
})
export class AppConfigModule {}
