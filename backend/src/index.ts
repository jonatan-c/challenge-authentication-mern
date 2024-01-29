// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.router";
import cors from "cors";
import morgan from "morgan";
dotenv.config();

import "./db/database";
import { PORT } from "./config";

const app: Express = express();
const port = PORT;
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
