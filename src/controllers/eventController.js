import { getUserEvents } from "../services/eventService.js";

export const getUserEventsController = async (req, res) => {
	try {
		const events = await getUserEvents(req.user.id);
		res.status(200).json(events);
	} catch (error) {
		const status = error.status || 500;
		res.status(status).json({ message: error.message });
	}
};
