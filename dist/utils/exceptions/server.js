import { HttpStatusCodes } from "../enums/http.js";
import HttpException from "./HttpException.js";
class InternalServerErrorException extends HttpException {
    constructor(message = "Internal Server Error", data = {}) {
        super(HttpStatusCodes.ServerError.INTERNAL_SERVER_ERROR, message, data);
    }
}
export { InternalServerErrorException };
//# sourceMappingURL=server.js.map