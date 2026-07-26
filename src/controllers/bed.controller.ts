import type { Request, Response } from "express";
import { BedService } from "../services/bed.service.ts";
import { HttpStatusCodes } from "../utils/enums/http.ts";

export class BedController {
    private bedService: BedService;

    constructor() {
        this.bedService = new BedService();
    }

    create = async (req: Request, res: Response) => {
        const { propertyId, roomId } = req.params as { roomId: string, propertyId: string };
        const { label, rentAmount, isOccupied } = req.body;
        const bed = await this.bedService.create(roomId, label, rentAmount, propertyId, isOccupied);
        res.status(HttpStatusCodes.Success.CREATED).json(bed);
    };

    getBedsByRoom = async (req: Request, res: Response) => {
        const { roomId, propertyId } = req.params as { roomId: string, propertyId: string };
        const beds = await this.bedService.getBedsByRoom(roomId, propertyId);
        res.status(HttpStatusCodes.Success.OK).json(beds);
    };

    update = async (req: Request, res: Response) => {
        const { bedId, roomId, propertyId } = req.params as { bedId: string, roomId: string, propertyId: string };
        const bed = await this.bedService.update({bedId, propertyId, roomId, updateData: req.body});
        res.status(HttpStatusCodes.Success.OK).json(bed);
    };

    delete = async (req: Request, res: Response) => {
        const { bedId, roomId, propertyId } = req.params as { bedId: string, roomId: string, propertyId: string };
        const result = await this.bedService.delete(bedId, propertyId, roomId);
        res.status(HttpStatusCodes.Success.OK).json(result);
    };
}
