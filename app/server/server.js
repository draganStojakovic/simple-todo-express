import { connectDB } from "../database/dbConn.js";
import mongoose from "mongoose";
import App from "../app.js";
import * as dotenv from "dotenv";

export const runServer = () => {
    connectDB();
    mongoose.connection.on("open", () => {
        const app = App();
        const PORT = dotenv.config().parsed.PORT;
        const server = app.listen(PORT, () => {
            console.log(`Running at: http://127.0.0.1:/${PORT}`);
        });

        server.on("error", console.error);
    });
};
