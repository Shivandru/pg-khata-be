import { HttpStatusCodes } from "../enums/http.js";
import HttpException from "./HttpException.js";
class BadRequestException extends HttpException {
    constructor(message = "Bad Request", data = {}) {
        super(HttpStatusCodes.ClientError.BAD_REQUEST, message, data);
    }
}
class UnauthorizedException extends HttpException {
    constructor(message = "Unauthorized", data = {}) {
        super(HttpStatusCodes.ClientError.UNAUTHORIZED, message, data);
    }
}
class ForbiddenException extends HttpException {
    constructor(message = "Forbidden", data = {}) {
        super(HttpStatusCodes.ClientError.FORBIDDEN, message, data);
    }
}
class NotFoundException extends HttpException {
    constructor(message = "Not Found", data = {}) {
        super(HttpStatusCodes.ClientError.NOT_FOUND, message, data);
    }
}
class ConflictException extends HttpException {
    constructor(message = "Conflict", data = {}) {
        super(HttpStatusCodes.ClientError.CONFLICT, message, data);
    }
}
export { BadRequestException, UnauthorizedException, ForbiddenException, NotFoundException, ConflictException };
//# sourceMappingURL=client.js.map