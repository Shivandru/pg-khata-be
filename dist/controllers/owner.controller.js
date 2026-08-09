import { OwnerService } from "../services/owner.service.js";
import { HttpStatusCodes } from "../utils/enums/http.js";
export class OwnerController {
    ownerService;
    constructor(ownerService) {
        this.ownerService = ownerService;
    }
    create = async (req, res) => {
        const owner = await this.ownerService.create(req.user?.userId, req.body);
        res.status(HttpStatusCodes.Success.CREATED).json(owner);
    };
    getById = async (req, res) => {
        const { id } = req.params;
        const owner = await this.ownerService.getById(id);
        res.status(HttpStatusCodes.Success.OK).json(owner);
    };
    getMe = async (req, res) => {
        const owner = await this.ownerService.getByUserId(req.user?.userId);
        res.status(HttpStatusCodes.Success.OK).json(owner);
    };
    update = async (req, res) => {
        const { id } = req.params;
        const owner = await this.ownerService.update(id, req.body);
        res.status(HttpStatusCodes.Success.OK).json(owner);
    };
    delete = async (req, res) => {
        const { id } = req.params;
        await this.ownerService.delete(id);
        res.status(HttpStatusCodes.Success.NO_CONTENT).send();
    };
}
//# sourceMappingURL=owner.controller.js.map