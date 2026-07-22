import type { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                role: "owner" | "guest";
            };
        }
    }
}

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const xUserId = req.headers["x-user-id"];
    const xUserRole = req.headers["x-user-role"];

    let userId: string | null = null;
    let role: "owner" | "guest" = "owner";

    if (authHeader && authHeader.startsWith("Bearer ")) {
        userId = authHeader.substring(7).trim();
    } else if (typeof xUserId === "string") {
        userId = xUserId.trim();
    }

    if (typeof xUserRole === "string" && (xUserRole === "owner" || xUserRole === "guest")) {
        role = xUserRole as "owner" | "guest";
    }

    // Fallback to a default owner for development/testing if not specified
    if (!userId) {
        userId = "u-defaultOwner";
    }

    req.user = {
        userId,
        role,
    };

    next();
}
