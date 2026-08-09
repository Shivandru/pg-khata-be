import HttpException from "./HttpException.ts";
declare class BadRequestException extends HttpException {
    constructor(message?: string, data?: unknown);
}
declare class UnauthorizedException extends HttpException {
    constructor(message?: string, data?: unknown);
}
declare class ForbiddenException extends HttpException {
    constructor(message?: string, data?: unknown);
}
declare class NotFoundException extends HttpException {
    constructor(message?: string, data?: unknown);
}
declare class ConflictException extends HttpException {
    constructor(message?: string, data?: unknown);
}
export { BadRequestException, UnauthorizedException, ForbiddenException, NotFoundException, ConflictException };
//# sourceMappingURL=client.d.ts.map