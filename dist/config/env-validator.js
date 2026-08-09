import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();
const envSchema = z.object({
    MONGO_DB_URI: z.string().min(1),
    MONGO_DB_NAME: z.string().min(1),
    PORT: z.coerce.number().int().min(1).max(65535).default(8080),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    GOOGLE_CLIENT_ID: z.string().min(1),
});
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error("Environment validation error: ", parsedEnv.error.message);
    process.exit(1);
}
export const env = parsedEnv.data;
//# sourceMappingURL=env-validator.js.map