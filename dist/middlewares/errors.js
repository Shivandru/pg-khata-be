import HttpException from "../utils/exceptions/HttpException.js";
import { HttpStatusCodes } from "../utils/enums/http.js";
export default async function errorHandler(err, _req, res, _next) {
    if (err instanceof HttpException) {
        res.status(err.statusCode).json(err);
        return;
    }
    res.status(HttpStatusCodes.ServerError.INTERNAL_SERVER_ERROR).json({
        message: err instanceof Error ? err.message : "Internal Server Error",
    });
}
//# sourceMappingURL=errors.js.map