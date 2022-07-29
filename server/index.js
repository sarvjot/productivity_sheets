import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);

app.use((err, req, res, next) => {
    console.log(err);
    next();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
