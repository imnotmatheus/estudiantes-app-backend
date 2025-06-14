import express from "express";
import { getEvent, deleteEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get("/:id", getEvent);
router.delete("/:id", deleteEvent);

export default router;
