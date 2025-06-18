import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
    getUserEventsController,
    getEvent,
    deleteEvent, saveNewEventController,
} from "../controllers/eventController.js";

const eventsRouter = express.Router();

eventsRouter.get("/", authMiddleware, getUserEventsController);
eventsRouter.get("/:id", authMiddleware, getEvent);
eventsRouter.delete("/:id", authMiddleware, deleteEvent);
eventsRouter.post("/", saveNewEventController);

export default eventsRouter;
