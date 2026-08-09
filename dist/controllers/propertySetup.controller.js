import { HttpStatusCodes } from "../utils/enums/http.js";
export class PropertySetupController {
    propertySetupService;
    constructor(propertySetupService) {
        this.propertySetupService = propertySetupService;
    }
    setup = async (req, res) => {
        const userId = req.user?.userId;
        const result = await this.propertySetupService.setup(userId, req.body);
        res.status(HttpStatusCodes.Success.CREATED).json(result);
    };
}
//# sourceMappingURL=propertySetup.controller.js.map