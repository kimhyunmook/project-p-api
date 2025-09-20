import { Module } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserMgmtController } from "./controllers/user.mgmt.controller";

@Module({
  controllers: [UserMgmtController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
