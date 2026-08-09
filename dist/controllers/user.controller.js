import { UserServices } from "../services/user.service.js";
import { UnauthorizedException } from "../utils/exceptions/client.js";
import { HttpStatusCodes } from "../utils/enums/http.js";
export class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    create = async (req, res) => {
        try {
            const { name, email, phone, role, provider } = req.body;
            const user = await this.userService.create(name, email, phone, role, provider);
            res.status(HttpStatusCodes.Success.CREATED).json(user);
        }
        catch (error) {
            if (error instanceof UnauthorizedException) {
                res
                    .status(HttpStatusCodes.ClientError.UNAUTHORIZED)
                    .json({ message: error.message });
            }
            else {
                res
                    .status(HttpStatusCodes.ServerError.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal Server Error" });
            }
        }
    };
    getUser = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("Missing property ID parameter");
            }
            const user = await this.userService.getUser(id);
            res.status(HttpStatusCodes.Success.OK).json(user);
        }
        catch (error) {
            res
                .status(HttpStatusCodes.ServerError.INTERNAL_SERVER_ERROR)
                .json({ message: "Internal Server Error" });
        }
    };
    update = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("Missing property ID parameter");
            }
            const result = await this.userService.update(id, req.body);
            res.status(HttpStatusCodes.Success.OK).json(result);
        }
        catch (error) {
            res
                .status(HttpStatusCodes.ServerError.INTERNAL_SERVER_ERROR)
                .json({ message: "Internal Server Error" });
        }
    };
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("Missing property ID parameter");
            }
            const result = await this.userService.delete(id);
            res.status(HttpStatusCodes.Success.OK).json(result);
        }
        catch (error) {
            res
                .status(HttpStatusCodes.ServerError.INTERNAL_SERVER_ERROR)
                .json({ message: "Internal Server Error" });
        }
    };
}
//# sourceMappingURL=user.controller.js.map