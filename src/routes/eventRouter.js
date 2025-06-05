import express from "express";
import { getEvent } from "../controllers/eventController.js";

const router = express.Router();
router.get("/:id", getEvent);  //acá faltaría agregar en App la ruta a event

export default router;
