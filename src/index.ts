import express from "express";
import dotenv from "dotenv";
import { env} from "./config/env-validator.ts";
import MongoConnection from "./config/db.ts";
import setupLoggerMiddleware from "./middlewares/logger.ts";
import setupCorsMiddleware from "./middlewares/cors-setup.ts";
import errorHandler from "./middlewares/errors.ts";

dotenv.config();
const PORT = env.PORT ?? 7700;

const app = express();
setupLoggerMiddleware(app);
setupCorsMiddleware(app);
app.use(errorHandler);

app.listen(PORT, async () =>{
    console.log(`Server running on port ${PORT}`);
    try {
        await MongoConnection.getInstance().connect();
    } catch (error) {
        throw new Error(`Error while connecting db ${error}`);
    }
});