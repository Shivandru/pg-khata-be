import { ZodError } from "zod";
import HttpException from "../utils/exceptions/HttpException.js";
import { HttpStatusCodes } from "../utils/enums/http.js";
function buildErrorString(err, container) {
    return `Error validating ${container}: ${JSON.stringify(err.message)}`;
}
export function createValidator(cfg = {}) {
    const containers = {
        query: "originalQuery",
        body: "originalBody",
        headers: "originalHeaders",
        params: "originalParams",
    };
    const instance = {};
    Object.keys(containers).forEach((type) => {
        const storageKey = containers[type];
        instance[type] = (schema, opts = {}) => {
            return (req, _res, next) => {
                try {
                    const data = req[type];
                    const parsedData = schema.parse(data);
                    // Store the original data
                    req[storageKey] = data;
                    // Replace with parsed data
                    if (type === "query") {
                        Object.defineProperty(req, type, {
                            value: parsedData,
                            writable: false,
                        });
                    }
                    else {
                        req[type] = parsedData;
                    }
                    next();
                }
                catch (err) {
                    console.log(err);
                    if (err instanceof ZodError) {
                        const errorMessage = buildErrorString(err, `request ${type}`);
                        if (opts.passError || cfg.passError) {
                            next(err);
                        }
                        else {
                            throw new HttpException(opts.statusCode || cfg.statusCode || HttpStatusCodes.ClientError.BAD_REQUEST, errorMessage);
                        }
                    }
                    else {
                        next(err);
                    }
                }
            };
        };
    });
    instance.response = (schema, opts = {}) => {
        return (_req, res, next) => {
            const originalJson = res.json.bind(res);
            res.json = (data) => {
                try {
                    if (data instanceof HttpException || res.statusCode >= 400)
                        return originalJson(data);
                    const parsedData = schema.parse(data);
                    return originalJson(parsedData); // Ensure we always return the response
                }
                catch (err) {
                    if (err instanceof ZodError) {
                        const errorMessage = buildErrorString(err, "response");
                        if (opts.passError || cfg.passError) {
                            res.json = originalJson;
                            next(err);
                            return res;
                        }
                        else {
                            res.json = originalJson;
                            next(new HttpException(opts.statusCode || cfg.statusCode || HttpStatusCodes.ServerError.INTERNAL_SERVER_ERROR, errorMessage));
                            return res;
                        }
                    }
                    else {
                        res.json = originalJson;
                        next(err);
                        return res;
                    }
                }
            };
            next();
        };
    };
    return instance;
}
//# sourceMappingURL=validator.js.map