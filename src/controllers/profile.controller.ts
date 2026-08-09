import type { Request, Response } from "express";
import type { ProfileService } from "../services/profile.service.ts";
import { HttpStatusCodes } from "../utils/enums/http.ts";

export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  getMe = async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;
    const profile = await this.profileService.getProfile(userId);
    res.status(HttpStatusCodes.Success.OK).json(profile);
  };
}
