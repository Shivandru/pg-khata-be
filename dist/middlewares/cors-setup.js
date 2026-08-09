import cors, {} from "cors";
// import  from "@types/cors";
const allowedOrigins = [
    "http://localhost:3000",
];
const ngrokRegex = /^https:\/\/.*\.ngrok-free\.app/;
export const corsVerifier = (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || ngrokRegex.test(origin)) {
        callback(null, true);
    }
    else {
        callback(new Error("Not allowed by CORS"));
    }
};
export default function setupCorsMiddleware(app) {
    app.use(cors({
        origin: corsVerifier,
        credentials: true,
    }));
    app.options(/.*/, cors());
    app.use(async function (_req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        next();
    });
}
//# sourceMappingURL=cors-setup.js.map