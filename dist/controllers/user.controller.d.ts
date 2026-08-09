import type { Request, Response } from "express";
import { UserServices } from "../services/user.service.ts";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserServices);
    create: (req: Request, res: Response) => Promise<void>;
    getUser: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map