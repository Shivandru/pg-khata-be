import type { Request, Response } from "express";
import { RoomService } from "../services/room.service.ts";
import { HttpStatusCodes } from "../utils/enums/http.ts";

export class RoomController {

    constructor(
        private readonly roomService: RoomService
    ) {}

    create = async (req: Request, res: Response) => {
        const { propertyId } = req.params as { propertyId: string };
        const { roomNumber, floor, bedCount, occupiedCount } = req.body;
        const room = await this.roomService.create({ propertyId, roomNumber, floor, bedCount, occupiedCount });
        res.status(HttpStatusCodes.Success.CREATED).json(room);
    };

    getRoomsByProperty = async (req: Request, res: Response) => {
        const { propertyId } = req.params as { propertyId: string };
        const rooms = await this.roomService.getRoomsByProperty(propertyId);
        res.status(HttpStatusCodes.Success.OK).json(rooms);
    };

    getRoomById = async (req: Request, res: Response) => {
        const { roomId, propertyId } = req.params as { roomId: string, propertyId: string };
        const room = await this.roomService.getById({ propertyId, roomId });
        res.status(HttpStatusCodes.Success.OK).json(room);
    }

    update = async (req: Request, res: Response) => {
        const { roomId, propertyId } = req.params as { roomId: string, propertyId: string };
        const updateData = req.body;
        const room = await this.roomService.update({roomId, propertyId, updateData});
        res.status(HttpStatusCodes.Success.OK).json(room);
    };

    delete = async (req: Request, res: Response) => {
        const { roomId, propertyId } = req.params as { roomId: string, propertyId: string };
        const result = await this.roomService.delete({ roomId, propertyId });
        res.status(HttpStatusCodes.Success.OK).json(result);
    };
}
