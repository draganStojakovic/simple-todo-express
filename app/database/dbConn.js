import * as dotenv from "dotenv";
import mongoose from "mongoose";

export const connectDB = async () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(
        dotenv.config().parsed.DB_CONN,
        () => {
            console.log("Connection successfull.");
        },
        (e) => console.log(e)
    );
};