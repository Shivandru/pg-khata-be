import type { Request, Response } from "express";
import { BedService } from "../services/bed.service.ts";
import { HttpStatusCodes } from "../utils/enums/http.ts";

export class BedController {
    private bedService: BedService;

    constructor() {
        this.bedService = new BedService();
    }

    create = async (req: Request, res: Response) => {
        const { roomId } = req.params as { roomId: string };
        const { label, rentAmount } = req.body;
        const bed = await this.bedService.create(roomId, label, rentAmount);
        res.status(HttpStatusCodes.Success.CREATED).json(bed);
    };

    getBedsByRoom = async (req: Request, res: Response) => {
        const { roomId } = req.params as { roomId: string };
        const beds = await this.bedService.getBedsByRoom(roomId);
        res.status(HttpStatusCodes.Success.OK).json(beds);
    };

    update = async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const bed = await this.bedService.update(id, req.body);
        res.status(HttpStatusCodes.Success.OK).json(bed);
    };

    delete = async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const result = await this.bedService.delete(id);
        res.status(HttpStatusCodes.Success.OK).json(result);
    };
}
