import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { router } from "./routers";

/* import { userRouter } from "./routes/userRouter";
import { cardRouter } from "./routes/cardRoutes"; */

dotenv.config();

const app = express();

app.use(cors()).use(express.json()).use(router);

export { app };
