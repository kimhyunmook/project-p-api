import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { createErrorMappingExtension } from "./prisma.core";
import { CustomLoggerService } from "../logger/custom-logger.service";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly logger: CustomLoggerService) {
    super();
    const extended = this.$extends(createErrorMappingExtension(this.logger));
    Object.assign(this, extended);
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.debug("✅ Database connected", "PrismaService");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.debug("🔌 Database disconnected", "PrismaService");
  }
}
