import type { Application, Response, Request } from "express";
export interface RequestWithBodyContent extends Request {
    bodyContent?: string;
}
export interface ResponseWithBodyContent extends Response {
    bodyContent?: string;
    __skipLoggingBody?: boolean;
}
export default function setupLoggerMiddleware(app: Application): void;
//# sourceMappingURL=logger.d.ts.map