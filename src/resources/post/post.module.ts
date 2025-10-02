import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./controllers/post.controller";

@Module({
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
