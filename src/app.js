import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/events", eventRoutes);

export default app;