import AnsiColour from "../utils/enums/log-colours.ts";
import type { NextFunction, Request, Response } from "express";
export default class RequestLogger {
    private static store;
    static getMiddleware(logName: string, logColour?: AnsiColour): (req: Request, _res: Response, next: NextFunction) => void;
    private static getStore;
    static debug(message: string): void;
    static info(message: string): void;
    static warn(message: string): void;
    static error(message: string): void;
    static critical(message: string): void;
}
//# sourceMappingURL=RequestLogger.d.ts.map