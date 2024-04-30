//needed to import from .env
import "dotenv/config";

import express from "express";
import morgan from "morgan";
import cors from "cors";

import { connectMongoDB } from "./src/config/mongoConfig.js";
import userRouter from "./src/router/userRouter.js";

const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//connect to Database
connectMongoDB();

//routes
app.use("/api/v1/users", userRouter);

//initialize server
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server Connected at http://localhost:${PORT}`);
});
