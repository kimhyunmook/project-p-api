import { HttpCode, applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

export function ApiDocs(
  { summary, status = 200, description, type }: ApiDocsOptions,
  bearerAuth: boolean = false,
) {
  const decorators = [
    ApiOperation({ summary }),
    ApiResponse({
      status,
      description: description || summary + " api",
      type: type || undefined,
    }),
    HttpCode(status), // 실제 HTTP 상태 코드 설정
  ];

  if (bearerAuth) decorators.push(ApiBearerAuth());
  return applyDecorators(...decorators);
}

interface ApiDocsOptions {
  summary: string;
  status?: number;
  description?: string;
  type?: any;
}
