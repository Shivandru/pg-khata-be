import { AsyncLocalStorage } from "node:async_hooks";
import Logger from "../utils/Logger.js";
import AnsiColour from "../utils/enums/log-colours.js";
export default class RequestLogger {
    static store = new AsyncLocalStorage({ name: "RequestLogger" });
    static getMiddleware(logName, logColour = AnsiColour.LightCyan) {
        return function loggerMiddleware(req, _res, next) {
            const username = req.headers["username"];
            const appVersionRaw = req.headers["app-version"];
            const isUsername = typeof username === "string" && username.length > 0;
            const appVersionNum = typeof appVersionRaw === "string" ? Number(appVersionRaw) : NaN;
            const isAppVersion = Number.isFinite(appVersionNum);
            const logger = isUsername && isAppVersion
                ? new Logger(logName, logColour, "user", { username })
                : new Logger(logName, logColour, "server");
            RequestLogger.store.run(logger, () => next());
        };
    }
    static getStore() {
        const logger = RequestLogger.store.getStore();
        if (!logger)
            throw new Error("Logger not found. You forgot to add the middleware or you called this outside of a request.");
        return logger;
    }
    static debug(message) {
        this.getStore().debug(message);
    }
    static info(message) {
        this.getStore().info(message);
    }
    static warn(message) {
        this.getStore().warn(message);
    }
    static error(message) {
        this.getStore().error(message);
    }
    static critical(message) {
        this.getStore().critical(message);
    }
}
//# sourceMappingURL=RequestLogger.js.map