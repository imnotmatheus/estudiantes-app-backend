import { searchEventById } from "../services/eventService.js";

export const getEvent = async (req, res) => {
    try {
        const event = await searchEventById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }
        res.json(event);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const message = statusCode === 500 ? "Internal server error" : error.message;
        res.status(statusCode).json({ message });
    }
};
