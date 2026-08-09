import { HttpStatusCodes } from "../utils/enums/http.js";
export class TenancyRegistrationController {
    tenancyRegistrationService;
    constructor(tenancyRegistrationService) {
        this.tenancyRegistrationService = tenancyRegistrationService;
    }
    register = async (req, res) => {
        const tenancy = await this.tenancyRegistrationService.register(req.user.userId, req.body);
        res.status(HttpStatusCodes.Success.CREATED).json(tenancy);
    };
    getActiveTenancy = async (req, res) => {
        const tenancy = await this.tenancyRegistrationService.getActiveTenancy(req.user.userId);
        res.status(HttpStatusCodes.Success.OK).json(tenancy);
    };
    getTenanciesByProperty = async (req, res) => {
        const { propertyId } = req.params;
        const tenancies = await this.tenancyRegistrationService.getTenanciesByProperty(propertyId);
        res.status(HttpStatusCodes.Success.OK).json(tenancies);
    };
    getGuestsByProperty = async (req, res) => {
        const { propertyId } = req.params;
        const guests = await this.tenancyRegistrationService.getGuestsByProperty(propertyId);
        res.status(HttpStatusCodes.Success.OK).json(guests);
    };
}
//# sourceMappingURL=tenancyRegistration.controller.js.map