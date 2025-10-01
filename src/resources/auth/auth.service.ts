import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/core/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { ISignUp } from "./types/signup.type";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async signUp({ email, password, ...rest }: ISignUp) {
    const saltRounds = Number(this.configService.get<string>("SALT_ROUNDS", { infer: true }));
    const hashed = await bcrypt.hash(password, saltRounds);

    const user = await this.prisma.$transaction(async (tx) => {
      const validate = await tx.user.findUnique({
        where: { email },
      });
      if (validate) throw new ConflictException("이미 사용중인 이메일입니다.");

      return tx.user.create({ data: { email, password: hashed, ...rest } });
    });
    return user;
  }

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException("id 또는 passowrd가 일치하지 않습니다.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException("id 또는 passowrd가 일치하지 않습니다.");

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
