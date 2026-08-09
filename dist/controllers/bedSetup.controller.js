import { HttpStatusCodes } from "../utils/enums/http.js";
export class BedSetupController {
    bedSetupService;
    constructor(bedSetupService) {
        this.bedSetupService = bedSetupService;
    }
    setup = async (req, res) => {
        const { propertyId, roomId } = req.params;
        const result = await this.bedSetupService.create({ propertyId, roomId });
        res.status(HttpStatusCodes.Success.CREATED).json(result);
    };
}
//# sourceMappingURL=bedSetup.controller.js.map