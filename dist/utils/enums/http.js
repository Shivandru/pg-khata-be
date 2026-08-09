// Success Status Codes
export var SuccessStatus;
(function (SuccessStatus) {
    SuccessStatus[SuccessStatus["OK"] = 200] = "OK";
    SuccessStatus[SuccessStatus["CREATED"] = 201] = "CREATED";
    SuccessStatus[SuccessStatus["ACCEPTED"] = 202] = "ACCEPTED";
    SuccessStatus[SuccessStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
    SuccessStatus[SuccessStatus["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
})(SuccessStatus || (SuccessStatus = {}));
// Redirection Status Codes
export var RedirectionStatus;
(function (RedirectionStatus) {
    RedirectionStatus[RedirectionStatus["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
    RedirectionStatus[RedirectionStatus["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
    RedirectionStatus[RedirectionStatus["FOUND"] = 302] = "FOUND";
})(RedirectionStatus || (RedirectionStatus = {}));
// Client Error Status Codes
export var ClientErrorStatus;
(function (ClientErrorStatus) {
    ClientErrorStatus[ClientErrorStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ClientErrorStatus[ClientErrorStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ClientErrorStatus[ClientErrorStatus["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    ClientErrorStatus[ClientErrorStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    ClientErrorStatus[ClientErrorStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    ClientErrorStatus[ClientErrorStatus["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    ClientErrorStatus[ClientErrorStatus["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
    ClientErrorStatus[ClientErrorStatus["CONFLICT"] = 409] = "CONFLICT";
    ClientErrorStatus[ClientErrorStatus["GONE"] = 410] = "GONE";
    ClientErrorStatus[ClientErrorStatus["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    ClientErrorStatus[ClientErrorStatus["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
})(ClientErrorStatus || (ClientErrorStatus = {}));
// Server Error Status Codes
export var ServerErrorStatus;
(function (ServerErrorStatus) {
    ServerErrorStatus[ServerErrorStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    ServerErrorStatus[ServerErrorStatus["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    ServerErrorStatus[ServerErrorStatus["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    ServerErrorStatus[ServerErrorStatus["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    ServerErrorStatus[ServerErrorStatus["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
})(ServerErrorStatus || (ServerErrorStatus = {}));
export const HttpStatusCodes = {
    Success: SuccessStatus,
    Redirection: RedirectionStatus,
    ClientError: ClientErrorStatus,
    ServerError: ServerErrorStatus,
};
export const validationSource = {
    BODY: "BODY",
    PARAMS: "PARAM",
    QUERY: "QUERY",
    RESPONSE: "RESPONSE",
};
//# sourceMappingURL=http.js.map