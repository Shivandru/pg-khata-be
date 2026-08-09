import jwt from "jsonwebtoken";
import { UnauthorizedException } from "./exceptions/client.js";
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
const SECRET = JWT_SECRET;
export function generateAccessToken(payload) {
    return jwt.sign(payload, SECRET, {
        expiresIn: "7d",
    });
}
export function verifyAccessToken(token) {
    try {
        const payload = jwt.verify(token, SECRET);
        if (typeof payload === "string") {
            throw new UnauthorizedException("Invalid token");
        }
        return payload;
    }
    catch {
        throw new UnauthorizedException("Invalid or expired token");
    }
}
//# sourceMappingURL=jwt.js.map