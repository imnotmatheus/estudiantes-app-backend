import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
    getUserEventsController,
    getEvent,
    deleteEvent,
} from "../controllers/eventController.js";

const eventsRouter = express.Router();

// TODO: Falta agregar el auth middleware a esta ruta.
eventsRouter.get("/", authMiddleware, getUserEventsController);
eventsRouter.get("/:id", authMiddleware, getEvent);
eventsRouter.delete("/:id", authMiddleware, deleteEvent);

export default eventsRouter;
