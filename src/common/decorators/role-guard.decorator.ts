import { SetMetadata } from "@nestjs/common";
import { ROLE_KEY } from "../guards/auth.guard";

export const UseRoleGuard = (role: string) => SetMetadata(ROLE_KEY, role);
