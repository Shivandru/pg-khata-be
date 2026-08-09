import { AuthService } from "../services/auth.service.js";
import { HttpStatusCodes } from "../utils/enums/http.js";
export class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    signup = async (req, res) => {
        const { idToken } = req.body;
        const result = await this.authService.signup(idToken);
        console.log({ result });
        res.status(HttpStatusCodes.Success.CREATED).json(result);
    };
}
//# sourceMappingURL=auth.controller.js.map