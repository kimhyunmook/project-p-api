import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserMgmtController } from "./controllers/user.mgmt.controller";

@Module({
  controllers: [UserMgmtController],
  providers: [UserService],
})
export class UserModule {}
