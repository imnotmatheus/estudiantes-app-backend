import express from "express";
import { getUserEventsController, getEvent, deleteEvent } from "../controllers/eventController.js";

const eventsRouter = express.Router();

// TODO: Falta agregar el auth middleware a esta ruta.
eventsRouter.get("/", getUserEventsController);
eventsRouter.get("/:id", getEvent);
eventsRouter.delete("/:id", deleteEvent);

export default eventsRouter;