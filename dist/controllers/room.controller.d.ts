import type { Request, Response } from "express";
import { RoomService } from "../services/room.service.ts";
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    create: (req: Request, res: Response) => Promise<void>;
    getRoomsByProperty: (req: Request, res: Response) => Promise<void>;
    getRoomById: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=room.controller.d.ts.map