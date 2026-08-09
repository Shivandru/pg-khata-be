import { type ZodSchema } from "zod";
import type { RequestHandler } from "express";
interface ExpressZodConfig {
    statusCode?: number;
    passError?: boolean;
}
interface ExpressZodInstance {
    body(schema: ZodSchema, opts?: ExpressZodConfig): RequestHandler;
    query(schema: ZodSchema, opts?: ExpressZodConfig): RequestHandler;
    params(schema: ZodSchema, opts?: ExpressZodConfig): RequestHandler;
    headers(schema: ZodSchema, opts?: ExpressZodConfig): RequestHandler;
    response(schema: ZodSchema, opts?: ExpressZodConfig): RequestHandler;
}
export declare function createValidator(cfg?: ExpressZodConfig): ExpressZodInstance;
export {};
//# sourceMappingURL=validator.d.ts.map