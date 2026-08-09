export declare enum SuccessStatus {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    PARTIAL_CONTENT = 206
}
export declare enum RedirectionStatus {
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302
}
export declare enum ClientErrorStatus {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429
}
export declare enum ServerErrorStatus {
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504
}
export declare const HttpStatusCodes: {
    readonly Success: typeof SuccessStatus;
    readonly Redirection: typeof RedirectionStatus;
    readonly ClientError: typeof ClientErrorStatus;
    readonly ServerError: typeof ServerErrorStatus;
};
export declare const validationSource: {
    BODY: string;
    PARAMS: string;
    QUERY: string;
    RESPONSE: string;
};
//# sourceMappingURL=http.d.ts.map