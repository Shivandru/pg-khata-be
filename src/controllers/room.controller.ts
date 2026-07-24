import type { Request, Response } from "express";
import { RoomService } from "../services/room.service.ts";
import { HttpStatusCodes } from "../utils/enums/http.ts";

export class RoomController {
    private roomService: RoomService;

    constructor() {
        this.roomService = new RoomService();
    }

    create = async (req: Request, res: Response) => {
        const { propertyId } = req.params as { propertyId: string };
        const { roomNumber, floor } = req.body;
        const room = await this.roomService.create(propertyId, roomNumber, floor);
        res.status(HttpStatusCodes.Success.CREATED).json(room);
    };

    getRoomsByProperty = async (req: Request, res: Response) => {
        const { propertyId } = req.params as { propertyId: string };
        const rooms = await this.roomService.getRoomsByProperty(propertyId);
        res.status(HttpStatusCodes.Success.OK).json(rooms);
    };

    update = async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const room = await this.roomService.update(id, req.body);
        res.status(HttpStatusCodes.Success.OK).json(room);
    };

    delete = async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const result = await this.roomService.delete(id);
        res.status(HttpStatusCodes.Success.OK).json(result);
    };
}
