import AnsiColour, { AnsiReset } from "./enums/log-colours.js";
import { env } from "../config/env-validator.js";
import { RedirectionStatus, SuccessStatus, ClientErrorStatus, ServerErrorStatus } from "./enums/http.js";
const coloursForSeverity = {
    DEBUG: AnsiColour.DarkGray,
    INFO: AnsiColour.Green,
    WARN: AnsiColour.Yellow,
    ERROR: AnsiColour.LightRed,
    CRITICAL: AnsiColour.Red,
};
export default class Logger {
    static isProduction = env.NODE_ENV === "production";
    loggerName;
    loggerColour;
    logMode;
    labels;
    constructor(loggerName, loggerColour, mode, labels) {
        this.loggerName = loggerName;
        this.loggerColour = loggerColour;
        this.logMode = mode;
        this.labels = labels;
    }
    formatLog(severity, message) {
        const timestamp = new Date().toISOString();
        if (Logger.isProduction) {
            if (this.logMode !== "api") {
                return JSON.stringify({
                    severity,
                    time: timestamp,
                    message,
                    labels: this.labels,
                });
            }
            const { request, response, latency } = message;
            // const ip = getIp(request);
            const httpRequest = {
                requestMethod: request.method,
                requestUrl: request.originalUrl || request.url,
                requestSize: request.socket.bytesRead.toString(),
                status: response.statusCode,
                responseSize: (response.get("content-length") || "0").toString(),
                userAgent: request.get("user-agent") || "",
                // remoteIp: ip,
                serverIp: request.socket.localAddress || "",
                referer: request.get("referer") || "",
                latency: `${(latency / 1000).toFixed(3)}s`,
            };
            const requestBody = request.bodyContent;
            const responseBody = response.bodyContent;
            return JSON.stringify({
                severity,
                time: timestamp,
                labels: {
                    requestBody,
                    responseBody,
                },
                httpRequest,
            });
        }
        const severityColour = coloursForSeverity[severity];
        const logPrefix = `${severityColour}${`[${severity}]`.padEnd(10, " ")}${AnsiReset} ${this.loggerColour}[${this.loggerName}]${AnsiReset} `;
        if (this.logMode === "server") {
            return `${logPrefix}${message}`;
        }
        if (this.logMode === "user") {
            const userLabels = this.labels;
            return `${logPrefix}(${userLabels.username}) ${message}`;
        }
        if (this.logMode === "api") {
            const { request, response, latency } = message;
            const requestBody = request.bodyContent;
            const responseBody = response.bodyContent;
            const apiLog = `${request.method} ${request.originalUrl || request.url} ${response.statusCode} ${(latency / 1000).toFixed(3)}s \nREQUEST BODY: ${JSON.stringify(requestBody) || ""} \nRESPONSE BODY: ${JSON.stringify(responseBody) || ""}`;
            return `${logPrefix}${apiLog}`;
        }
        throw new Error("Invalid log mode");
    }
    debug(message) {
        console.log(this.formatLog("DEBUG", message));
    }
    info(message) {
        console.log(this.formatLog("INFO", message));
    }
    warn(message) {
        console.warn(this.formatLog("WARN", message));
    }
    error(message) {
        console.error(this.formatLog("ERROR", message));
    }
    critical(message) {
        console.error(this.formatLog("CRITICAL", message));
    }
}
//# sourceMappingURL=Logger.js.map