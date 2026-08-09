import type { Request, Response } from "express";
import { OwnerService } from "../services/owner.service.ts";
import { HttpStatusCodes } from "../utils/enums/http.ts";

export class OwnerController {
  constructor(
    private readonly ownerService: OwnerService,
  ) {}

  create = async (req: Request, res: Response) => {
    const owner = await this.ownerService.create(
      req.user?.userId as string,
      req.body,
    );

    res.status(HttpStatusCodes.Success.CREATED).json(owner);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const owner = await this.ownerService.getById(id);

    res.status(HttpStatusCodes.Success.OK).json(owner);
  };

  getMe = async (req: Request, res: Response) => {
    const owner = await this.ownerService.getByUserId(
      req.user?.userId as string,
    );

    res.status(HttpStatusCodes.Success.OK).json(owner);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const owner = await this.ownerService.update(id, req.body);

    res.status(HttpStatusCodes.Success.OK).json(owner);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    await this.ownerService.delete(id);

    res.status(HttpStatusCodes.Success.NO_CONTENT).send();
  };
}