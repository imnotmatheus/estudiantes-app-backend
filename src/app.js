import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import eventsRouter from "./routes/eventRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/events", eventsRouter);

export default app;
