import type { Request, Response } from "express";
import { PropertyService } from "../services/property.service.ts";
import { UnauthorizedException } from "../utils/exceptions/client.ts";
import { HttpStatusCodes } from "../utils/enums/http.ts";

export class PropertyController {

    constructor(
        private readonly propertyService: PropertyService
    ) {}

    create = async (req: Request, res: Response) => {
        if (!req.user) {
            throw new UnauthorizedException("User not authenticated");
        }
        const { name, address } = req.body;
        const { userId: ownerId } = req.user;
        const property = await this.propertyService.create({ name, address, ownerId });
        res.status(HttpStatusCodes.Success.CREATED).json(property);
    };

    getById = async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        if (!id) {
            throw new Error("Missing property ID parameter");
        }
        const property = await this.propertyService.getById(id);
        res.status(HttpStatusCodes.Success.OK).json(property);
    };

    update = async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        if (!id) {
            throw new Error("Missing property ID parameter");
        }
        const property = await this.propertyService.update(id, req.body);
        res.status(HttpStatusCodes.Success.OK).json(property);
    };

    getAll = async (_req: Request, res: Response) => {
        const properties = await this.propertyService.getAll();
        res.status(HttpStatusCodes.Success.OK).json(properties);
    };

    getByOwner = async (req: Request, res: Response) => {
        const property = await this.propertyService.getByOwnerId(req.user!.userId);
        res.status(HttpStatusCodes.Success.OK).json(property);
    };
}
