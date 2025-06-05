import { searchEventById } from "../services/eventService.js";

export const getEvent = async (req, res) => {
    try {
        const event = await searchEventById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }
        res.json(event);
    } catch (error) {
        console.log("Error fetching event: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
