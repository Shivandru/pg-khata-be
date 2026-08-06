import type { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../utils/exceptions/client.ts";
import { verifyAccessToken } from "../utils/jwt.ts";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: "owner" | "guest" | null;
      };
    }
  }
}

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new UnauthorizedException("Missing access token.");
  }

  const token = authHeader.substring(7).trim();

  const payload = verifyAccessToken(token);

  req.user = {
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
  };

  next();
}
