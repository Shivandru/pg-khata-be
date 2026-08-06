import jwt from "jsonwebtoken";
import type { Role } from "../schemas/user.ts";
import { UnauthorizedException } from "./exceptions/client.ts";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
const SECRET: string = JWT_SECRET;

export interface AccessTokenPayload {
    userId: string;
    email: string;
    role: Role | null;
}

export function generateAccessToken(payload: AccessTokenPayload): string {
    return jwt.sign(payload, SECRET, {
        expiresIn: "7d",
    });
}

export function verifyAccessToken(
    token: string
): AccessTokenPayload {
    try {
        const payload = jwt.verify(token, SECRET);

        if (typeof payload === "string") {
            throw new UnauthorizedException("Invalid token");
        }

        return payload as AccessTokenPayload;
    } catch {
        throw new UnauthorizedException("Invalid or expired token");
    }
}