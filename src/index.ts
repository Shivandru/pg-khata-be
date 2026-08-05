import dotenv from "dotenv";
import express from "express";
import { buildContainer } from "./config/container.ts";
import MongoConnection from "./config/db.ts";
import { env } from "./config/env-validator.ts";
import setupCorsMiddleware from "./middlewares/cors-setup.ts";
import errorHandler from "./middlewares/errors.ts";
import setupLoggerMiddleware from "./middlewares/logger.ts";
import createApiRouter from "./routes/index.ts";
import { createIndexes } from "./config/mongoIndexes.ts";

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
    const container = buildContainer();
    const apiRouter = createApiRouter(container);

    app.use(apiRouter.getRouter());

    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}

bootstrap();