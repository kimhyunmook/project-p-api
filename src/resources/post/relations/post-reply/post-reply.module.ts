import { Module } from "@nestjs/common";
import { PostReplyService } from "./post-reply.service";
import { PostReplyController } from "./controllers/post-reply.controller";

@Module({
  controllers: [PostReplyController],
  providers: [PostReplyService],
  exports: [PostReplyService],
})
export class PostReplyModule {}
