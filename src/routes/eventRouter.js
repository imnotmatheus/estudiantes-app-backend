import express from "express";
import { getEventsController } from "../controllers/eventController.js";

const eventsRouter = express.Router();

// TODO: Falta agregar el auth middleware a esta ruta.
eventsRouter.get("/", getEventsController);

export default eventsRouter;
