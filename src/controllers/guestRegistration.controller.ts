import type { Request, Response } from "express";
import { HttpStatusCodes } from "../utils/enums/http.ts";
import { GuestRegistrationService } from "../services/guestRegistration.service.ts";

export class GuestRegistrationController {
    constructor(
        private readonly guestRegistrationService: GuestRegistrationService,
    ) {}

    register = async (req: Request, res: Response) => {
        const { phone } = req.body;

        const guest = await this.guestRegistrationService.register(
            req.user?.userId as string,
            phone,
        );

        res.status(HttpStatusCodes.Success.CREATED).json(guest);
    };
}