import dotenv from "dotenv";
import express from "express";
import { buildContainer } from "./config/container.js";
import MongoConnection from "./config/db.js";
import { env } from "./config/env-validator.js";
import setupCorsMiddleware from "./middlewares/cors-setup.js";
import errorHandler from "./middlewares/errors.js";
import setupLoggerMiddleware from "./middlewares/logger.js";
import createApiRouter from "./routes/index.js";
import { createIndexes } from "./config/mongoIndexes.js";
dotenv.config();
const PORT = env.PORT ?? 7700;
async function bootstrap() {
    await MongoConnection.getInstance().connect();
    const db = MongoConnection.getInstance().getDb();
    await createIndexes(db);
    const app = express();
    app.use(express.json());
    setupCorsMiddleware(app);
    setupLoggerMiddleware(app);
    // Health check
    app.get("/", (_req, res) => {
        res.status(200).json({
            status: "ok",
        });
    });
    const container = buildContainer();
    const apiRouter = createApiRouter(container);
    app.use(apiRouter.getRouter());
    app.use(errorHandler);
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=index.js.map