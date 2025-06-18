import { getUserEvents, searchEventById, removeEventById, saveNewEventService } from "../services/eventService.js";

export const saveNewEventController = async (req, res) => {
    const {title, description, endDate, type, userId} = req.body;

    try {
        const eventoCreado = await saveNewEventService(title, description, endDate, type, userId);
        res.status(201).json(eventoCreado);

    } catch (error) {
        const statusCode = error.status || 500;
        res.status(statusCode).json({error_message: error.message});
    }
}

export const getUserEventsController = async (req, res) => {
	try {
		const events = await getUserEvents(req.query.id);
		res.status(200).json(events);
	} catch (error) {
		const status = error.status || 500;
		res.status(status).json({ message: error.message });
	}
};

export const getEvent = async (req, res) => {
    try {
        const event = await searchEventById(req.params.id);
        res.json(event);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const message = statusCode === 500 ? "Internal server error" : error.message;
        res.status(statusCode).json({ message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const result = await removeEventById(req.params.id);
        res.json(result);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const message = statusCode === 500 ? "Internal server error" : error.message;
        res.status(statusCode).json({ message });
    }
};

