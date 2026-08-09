import type { Request, Response } from "express";
import { BedService } from "../services/bed.service.ts";
import { HttpStatusCodes } from "../utils/enums/http.ts";
import type { RoomById } from "../services/room.service.ts";

export type BedById = {
    bedId: string;
    roomId: string;
    propertyId: string;
}

export class BedController {

    constructor(
        private readonly bedService: BedService
    ) {}

    create = async (req: Request, res: Response) => {
        const { propertyId, roomId } = req.params as RoomById;
        const bed = await this.bedService.create(roomId, propertyId);
        res.status(HttpStatusCodes.Success.CREATED).json(bed);
    };

    getBedsByRoom = async (req: Request, res: Response) => {
        const { roomId, propertyId } = req.params as RoomById;
        const beds = await this.bedService.getBedsByRoom(roomId, propertyId);
        res.status(HttpStatusCodes.Success.OK).json(beds);
    };

    update = async (req: Request, res: Response) => {
        const { bedId, roomId, propertyId } = req.params as BedById;
        const bed = await this.bedService.update({ bedId, propertyId, roomId, updateData: req.body });
        res.status(HttpStatusCodes.Success.OK).json(bed);
    };

    delete = async (req: Request, res: Response) => {
        const { bedId, roomId, propertyId } = req.params as BedById;
        const result = await this.bedService.delete(bedId, propertyId, roomId);
        res.status(HttpStatusCodes.Success.OK).json(result);
    };
}
