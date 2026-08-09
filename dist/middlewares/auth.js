import { UnauthorizedException } from "../utils/exceptions/client.js";
import { verifyAccessToken } from "../utils/jwt.js";
export function authMiddleware(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        throw new UnauthorizedException("Missing access token.");
    }
    const token = authHeader.substring(7).trim();
    console.log(req.headers.authorization);
    const payload = verifyAccessToken(token);
    req.user = {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
    };
    next();
}
//# sourceMappingURL=auth.js.map