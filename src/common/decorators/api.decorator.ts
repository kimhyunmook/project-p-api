import { Controller, applyDecorators } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

export function ApiController(path: string, tag?: string): ClassDecorator {
  return applyDecorators(Controller(path), ApiTags(tag ?? path));
}
