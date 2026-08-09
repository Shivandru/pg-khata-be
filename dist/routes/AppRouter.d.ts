import { Router, type RequestHandler, type RouterOptions } from "express";
declare class AppRouter {
    private router;
    constructor(options?: RouterOptions);
    get(path: string, ...handlers: RequestHandler[]): void;
    post(path: string, ...handlers: RequestHandler[]): void;
    put(path: string, ...handlers: RequestHandler[]): void;
    patch(path: string, ...handlers: RequestHandler[]): void;
    delete(path: string, ...handlers: RequestHandler[]): void;
    use(path: string, subRouter: AppRouter): void;
    use(path: string, ...handlers: RequestHandler[]): void;
    private wrapHandlers;
    getRouter(): Router;
    valueOf(): Router;
}
export default AppRouter;
//# sourceMappingURL=AppRouter.d.ts.map