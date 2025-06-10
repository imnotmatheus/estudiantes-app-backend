import { saveNewEventService } from "../services/eventService.js";

export const saveNewEventController = async (req, res) => {
    const {title, description, endDate, type, userId} = req.body;

    try {
        const eventoCreado = await saveNewEventService(title, description, endDate, type, userId);
        res.status(201).json(eventoCreado);

    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message});
    }
}