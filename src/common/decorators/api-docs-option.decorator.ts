import { Delete, Get, Patch, Post, Put, applyDecorators, Type } from "@nestjs/common";
import { ApiOperation, ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { UseRoleGuard } from "./role-guard.decorator";
import { Role } from "../interface/jwt.interface";

const methodMap = {
  GET: Get,
  POST: Post,
  PUT: Put,
  PATCH: Patch,
  DELETE: Delete,
};

function getHttpMethodDecorator(method: string, endpoint: string) {
  const HttpMethod = methodMap[method.toUpperCase() as keyof typeof methodMap] || Get;
  return HttpMethod(endpoint);
}

function getDescription(summaryDesc: string | undefined, role?: Role) {
  return `
  - ${summaryDesc ? summaryDesc : "API 설명"}
  ${role ? "- Auth 인증이 필요한 API입니다." : ""}
  `;
}

export function ApiDocs({
  summary,
  description,
  method = "GET",
  endpoint = "",
  role,
  responses,
}: ApiDocsOptions) {
  const decorators = [
    getHttpMethodDecorator(method, endpoint),
    ApiOperation({ summary, description: getDescription(description, role) }),
  ];

  // 응답 스키마 추가
  if (responses) {
    responses.forEach((response) => {
      decorators.push(
        ApiResponse({
          status: response.status,
          description: response.description,
          type: response.type,
        }),
      );
    });
  }

  if (role) {
    decorators.push(ApiBearerAuth(), UseRoleGuard(role));
  }

  return applyDecorators(...decorators);
}

export interface ApiResponseOption {
  status: number;
  description: string;
  type: Type<any>;
}

export interface ApiDocsOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endpoint?: string;
  summary: string;
  description?: string;
  role?: Role;
  responses?: ApiResponseOption[];
}
