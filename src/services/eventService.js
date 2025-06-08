import { findEvents } from "../data/eventData.js";

export const getEvents = async () => {
	try {
		return await findEvents();
	} catch (error) {
		throw new Error("Failed to get events", { status: 500 });
	}
};
