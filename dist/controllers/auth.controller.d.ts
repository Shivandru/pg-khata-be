import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.ts";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=auth.controller.d.ts.map