export interface AccountPayload {
  sub: number;
  email: string;
  role: Role;
}

export type Role = "user" | "admin";
