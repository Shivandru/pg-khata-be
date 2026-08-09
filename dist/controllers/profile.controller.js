import { HttpStatusCodes } from "../utils/enums/http.js";
export class ProfileController {
    profileService;
    constructor(profileService) {
        this.profileService = profileService;
    }
    getMe = async (req, res) => {
        const userId = req.user?.userId;
        const profile = await this.profileService.getProfile(userId);
        res.status(HttpStatusCodes.Success.OK).json(profile);
    };
}
//# sourceMappingURL=profile.controller.js.map