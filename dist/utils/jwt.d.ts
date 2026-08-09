import type { Role } from "../schemas/user.ts";
export interface AccessTokenPayload {
    userId: string;
    email: string;
    role: Role | null;
}
export declare function generateAccessToken(payload: AccessTokenPayload): string;
export declare function verifyAccessToken(token: string): AccessTokenPayload;
//# sourceMappingURL=jwt.d.ts.map