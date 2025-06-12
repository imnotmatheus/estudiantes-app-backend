import express from "express";
import { getUserEventsController } from "../controllers/eventController.js";

const eventsRouter = express.Router();

// TODO: Falta agregar el auth middleware a esta ruta.
eventsRouter.get("/", getUserEventsController);

export default eventsRouter;
