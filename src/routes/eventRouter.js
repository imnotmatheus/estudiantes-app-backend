import express from "express";
import { saveNewEventController } from "../controllers/eventController.js";

const router = express.Router();

router.post("/", saveNewEventController);

export default router;