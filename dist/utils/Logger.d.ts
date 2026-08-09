import type { Request, Response } from "express";
import AnsiColour from "./enums/log-colours.ts";
type LogMode = "server" | "user" | "api";
type LogLabels<M extends LogMode> = M extends "user" ? {
    username: string;
} : undefined;
type LogOptions<M extends LogMode> = M extends "api" ? {
    request: Request;
    response: Response;
    latency: number;
} : undefined;
export default class Logger<T extends LogMode> {
    private static isProduction;
    private loggerName;
    private loggerColour;
    private logMode;
    private labels?;
    constructor(loggerName: string, loggerColour: AnsiColour, mode: T, labels?: LogLabels<T>);
    private formatLog;
    debug(message: T extends "api" ? LogOptions<T> : string): void;
    info(message: T extends "api" ? LogOptions<T> : string): void;
    warn(message: T extends "api" ? LogOptions<T> : string): void;
    error(message: T extends "api" ? LogOptions<T> : string): void;
    critical(message: T extends "api" ? LogOptions<T> : string): void;
}
export {};
//# sourceMappingURL=Logger.d.ts.map