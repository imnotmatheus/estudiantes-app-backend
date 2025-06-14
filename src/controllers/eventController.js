import { getUserEvents, searchEventById, removeEventById } from "../services/eventService.js";

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

