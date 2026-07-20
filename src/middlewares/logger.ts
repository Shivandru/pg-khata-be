import type { Application, NextFunction, Response, Request } from "express";
import AnsiColour from "../utils/enums/log-colours.ts";
import Logger from "../utils/Logger.ts";


const apiLogger = new Logger("API", AnsiColour.LightMagenta, "api");

export interface RequestWithBodyContent extends Request {
    bodyContent?: string;
}

export interface ResponseWithBodyContent extends Response {
    bodyContent?: string;
    __skipLoggingBody?: boolean;
}

const captureRequestBody = (req: RequestWithBodyContent, _res: Response, next: NextFunction) => {
    req.bodyContent = req.body ?? "";
    next();
};

const captureResponseBody = (_req: Request, res: ResponseWithBodyContent, next: NextFunction) => {
    const oldSend = res.send.bind(res);

    res.send = function (body: unknown) {
        // 1️⃣ Detect Content-Disposition attachment (file download)
        const disposition = res.getHeader("Content-Disposition");
        const isFile = disposition && String(disposition).toLowerCase().includes("attachment");

        // 2️⃣ Skip logging for files or Buffer responses
        if (isFile || Buffer.isBuffer(body)) {
            res.__skipLoggingBody = true;
            return oldSend(body);
        }

        // 3️⃣ Safe body capturing (strings + JSON)
        try {
            const responseBody = typeof body === "string" ? body : JSON.stringify(body);
            res.bodyContent = responseBody;
        } catch {
            // fallback, don't log this content if not serializable
            res.__skipLoggingBody = true;
        }

        return oldSend(body);
    };

    next();
};

export default function setupLoggerMiddleware(app: Application) {
    app.use(captureRequestBody);
    app.use(captureResponseBody);
    app.use(loggerMiddleware);
}

function loggerMiddleware(req: RequestWithBodyContent, res: ResponseWithBodyContent, next: NextFunction) {
    const startTime = Date.now();

    res.on("finish", () => {
        apiLogger.info({
            request: req,
            response: res,
            latency: Date.now() - startTime,
        });
    });

    next();
}
