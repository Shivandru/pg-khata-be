import { HttpStatusCodes } from "../utils/enums/http.js";
export class VacateTenancyController {
    vacateTenancyService;
    constructor(vacateTenancyService) {
        this.vacateTenancyService = vacateTenancyService;
    }
    vacate = async (req, res) => {
        const { tenancyId } = req.params;
        const tenancy = await this.vacateTenancyService.vacate(tenancyId, req.body);
        res.status(HttpStatusCodes.Success.OK).json(tenancy);
    };
}
//# sourceMappingURL=vacateTenancy.controller.js.map