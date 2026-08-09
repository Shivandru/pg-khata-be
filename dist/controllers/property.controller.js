import { PropertyService } from "../services/property.service.js";
import { UnauthorizedException } from "../utils/exceptions/client.js";
import { HttpStatusCodes } from "../utils/enums/http.js";
export class PropertyController {
    propertyService;
    constructor(propertyService) {
        this.propertyService = propertyService;
    }
    create = async (req, res) => {
        if (!req.user) {
            throw new UnauthorizedException("User not authenticated");
        }
        const { name, address } = req.body;
        const { userId } = req.user;
        const property = await this.propertyService.create({ name, address, userId });
        res.status(HttpStatusCodes.Success.CREATED).json(property);
    };
    getById = async (req, res) => {
        const { id } = req.params;
        if (!id) {
            throw new Error("Missing property ID parameter");
        }
        const property = await this.propertyService.getById(id);
        res.status(HttpStatusCodes.Success.OK).json(property);
    };
    update = async (req, res) => {
        const { id } = req.params;
        if (!id) {
            throw new Error("Missing property ID parameter");
        }
        const property = await this.propertyService.update(id, req.body);
        res.status(HttpStatusCodes.Success.OK).json(property);
    };
    getAll = async (_req, res) => {
        const properties = await this.propertyService.getAll();
        res.status(HttpStatusCodes.Success.OK).json(properties);
    };
    getByOwner = async (req, res) => {
        const property = await this.propertyService.getByOwnerId(req.user.userId);
        res.status(HttpStatusCodes.Success.OK).json(property);
    };
}
//# sourceMappingURL=property.controller.js.map