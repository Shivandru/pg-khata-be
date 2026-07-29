import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.ts";
import { HttpStatusCodes } from "../utils/enums/http.ts";
import type { CreateUser } from "../schemas/user.ts";

export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    signup = async (req: Request, res: Response) => {
        const userData = req.body as CreateUser;

        const result = await this.authService.signup(userData);
        console.log({result});

        res.status(HttpStatusCodes.Success.CREATED).json(result);
    };
}