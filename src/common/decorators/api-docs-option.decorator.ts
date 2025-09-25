import { Delete, Get, Patch, Post, Put, applyDecorators, Type } from "@nestjs/common";
import { ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { UseRoleGuard } from "./role-guard.decorator";
import { Role } from "@prisma/client";

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
  - API 설명 ${summaryDesc ? summaryDesc : ""}
  ${role ? "- Auth 인증이 필요한 API입니다." : ""}
  `;
}

export function ApiDocs({
  summary,
  description,
  method = "GET",
  endpoint = "",
  role,
}: ApiDocsOptions) {
  const decorators = [
    getHttpMethodDecorator(method, endpoint),
    ApiOperation({ summary, description: getDescription(description, role) }),
  ];

  if (role) {
    decorators.push(ApiBearerAuth(), UseRoleGuard(role));
  }

  return applyDecorators(...decorators);
}

interface ApiDocsOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endpoint?: string;
  summary: string;
  description?: string;
  role?: Role;
}
