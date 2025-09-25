import "express";
import { JwtPayload } from "src/common/interface/jwt.interface";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
