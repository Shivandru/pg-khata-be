import { HttpStatusCodes } from "../utils/enums/http.js";
import { GuestRegistrationService } from "../services/guestRegistration.service.js";
export class GuestRegistrationController {
    guestRegistrationService;
    constructor(guestRegistrationService) {
        this.guestRegistrationService = guestRegistrationService;
    }
    register = async (req, res) => {
        const guest = await this.guestRegistrationService.register(req.user?.userId);
        res.status(HttpStatusCodes.Success.CREATED).json(guest);
    };
    getMe = async (req, res) => {
        const guest = await this.guestRegistrationService.getGuestByUserId(req.user?.userId);
        res.status(HttpStatusCodes.Success.OK).json(guest);
    };
}
//# sourceMappingURL=guestRegistration.controller.js.map