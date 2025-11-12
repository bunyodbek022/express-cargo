import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middleware/errorHandler.js";
import { mainRouter } from "./src/routes/index.js";
dotenv.config()
const app = express();
app.use(cookieParser());  // cookie
app.use(express.json());
app.use(morgan('tiny'));  // morgan

app.use("/", mainRouter);

app.use(errorHandler);  // errorHandler

const bootstrap = async () => {
    try {
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`)
        })
    } catch (err) {
        console.log(err);

    }
};

bootstrap()
