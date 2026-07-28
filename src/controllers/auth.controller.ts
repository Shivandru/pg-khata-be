import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.ts";
import { HttpStatusCodes } from "../utils/enums/http.ts";
import type { CreateUser } from "../schemas/user.ts";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    signup = async (req: Request, res: Response) => {
        const userData = req.body as CreateUser;

        const result = await this.authService.signup(userData);
        console.log({result});

        res.status(HttpStatusCodes.Success.CREATED).json(result);
    };

    // login = async (req: Request, res: Response) => {
    //     const { email } = req.body as { email: string };

    //     const result = await this.authService.login(email);

    //     res.status(HttpStatusCodes.Success.OK).json(result);
    // };
}