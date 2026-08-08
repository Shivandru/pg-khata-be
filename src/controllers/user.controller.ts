import type { Request, Response } from "express";
import { UserServices } from "../services/user.service.ts";
import { UnauthorizedException } from "../utils/exceptions/client.ts";
import { HttpStatusCodes } from "../utils/enums/http.ts";

export class UserController {
  constructor(
    private readonly userService: UserServices
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      const { name, email, phone, role, provider } = req.body;
      const user = await this.userService.create(
        name,
        email,
        phone,
        role,
        provider
      );
      res.status(HttpStatusCodes.Success.CREATED).json(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        res
          .status(HttpStatusCodes.ClientError.UNAUTHORIZED)
          .json({ message: error.message });
      } else {
        res
          .status(HttpStatusCodes.ServerError.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal Server Error" });
      }
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params as { id: string };
      if (!id) {
        throw new Error("Missing property ID parameter");
      }
      const user = await this.userService.getUser(id);
      res.status(HttpStatusCodes.Success.OK).json(user);
    } catch (error) {
      res
        .status(HttpStatusCodes.ServerError.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params as { id: string };
      if (!id) {
        throw new Error("Missing property ID parameter");
      }
      const result = await this.userService.update(id, req.body);
      res.status(HttpStatusCodes.Success.OK).json(result);
    } catch (error) {
      res
        .status(HttpStatusCodes.ServerError.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params as { id: string };
      if (!id) {
        throw new Error("Missing property ID parameter");
      }
      const result = await this.userService.delete(id);
      res.status(HttpStatusCodes.Success.OK).json(result);
    } catch (error) {
      res
        .status(HttpStatusCodes.ServerError.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  };
}
