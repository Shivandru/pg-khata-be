import type { Request, Response } from "express";
import type { CreateRoom } from "../schemas/room.ts";
import type { RoomSetupService } from "../services/roomSetup.service.ts";
import { HttpStatusCodes } from "../utils/enums/http.ts";

export class RoomSetupController {
  constructor(
    private readonly roomSetupService: RoomSetupService,
  ) {}

  setup = async (req: Request, res: Response) => {
    const { propertyId } = req.params as { propertyId: string };
    const request = req.body as CreateRoom;

    const result = await this.roomSetupService.setup(propertyId, request);

    res.status(HttpStatusCodes.Success.CREATED).json(result);
  };
}