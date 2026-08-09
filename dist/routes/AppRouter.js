import { Router } from "express";
class AppRouter {
    router;
    constructor(options) {
        this.router = Router(options);
    }
    get(path, ...handlers) {
        this.router.get(path, ...this.wrapHandlers(handlers));
    }
    post(path, ...handlers) {
        this.router.post(path, ...this.wrapHandlers(handlers));
    }
    put(path, ...handlers) {
        this.router.put(path, ...this.wrapHandlers(handlers));
    }
    patch(path, ...handlers) {
        this.router.patch(path, ...this.wrapHandlers(handlers));
    }
    delete(path, ...handlers) {
        this.router.delete(path, ...this.wrapHandlers(handlers));
    }
    use(path, ...args) {
        if (args[0] instanceof AppRouter) {
            this.router.use(path, args[0].getRouter());
        }
        else {
            this.router.use(path, ...args);
        }
    }
    wrapHandlers(handlers) {
        return handlers.map((handler) => {
            return (req, res, next) => {
                Promise.resolve(handler(req, res, next)).catch(next);
            };
        });
    }
    getRouter() {
        return this.router;
    }
    valueOf() {
        return this.router;
    }
}
export default AppRouter;
//# sourceMappingURL=AppRouter.js.map