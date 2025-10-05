import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { createErrorMappingExtension } from "./prisma.core";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly Logger = new Logger(PrismaService.name);
  constructor() {
    super();
    const extended = this.$extends(createErrorMappingExtension(this.Logger));
    Object.assign(this, extended);
  }

  async onModuleInit() {
    await this.$connect();
  }
}
