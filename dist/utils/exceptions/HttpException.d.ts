export default class HttpException extends Error {
    readonly statusCode: number;
    readonly message: string;
    readonly data?: unknown;
    constructor(statusCode: number, message?: string, data?: unknown);
}
//# sourceMappingURL=HttpException.d.ts.map