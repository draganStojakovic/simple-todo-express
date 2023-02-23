import express from "express";
import { logger } from "./middleware/logger.js";
import { router } from "./routes/api.js";

const createApp = () => {
    const app = express();
    app.use(express.json());
    app.use(logger);
    app.use("/api", router);
    return app;
};

export default createApp;
