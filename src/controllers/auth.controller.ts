import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.ts";
import { HttpStatusCodes } from "../utils/enums/http.ts";

export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    signup = async (req: Request, res: Response) => {
        const { idToken } = req.body as { idToken: string };

        const result = await this.authService.signup(idToken);
        console.log({result});

        res.status(HttpStatusCodes.Success.CREATED).json(result);
    };
}