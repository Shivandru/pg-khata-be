import { HttpStatusCodes } from "../utils/enums/http.js";
export class RoomSetupController {
    roomSetupService;
    constructor(roomSetupService) {
        this.roomSetupService = roomSetupService;
    }
    setup = async (req, res) => {
        const { propertyId } = req.params;
        const request = req.body;
        const result = await this.roomSetupService.setup(propertyId, request);
        res.status(HttpStatusCodes.Success.CREATED).json(result);
    };
}
//# sourceMappingURL=roomSetup.controller.js.map