import { getEvents } from "../services/eventService.js";

export const getEventsController = async (req, res) => {
	try {
		const events = await getEvents();
		res.status(200).json(events);
	} catch (error) {
		const status = error.status || 500;
		res.status(status).json({ message: error.message });
	}
};
