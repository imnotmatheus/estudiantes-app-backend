import { ObjectId } from "mongodb";

export const EventType = {
	TRABAJO_PRACTICO: "Trabajo Práctico",
	PARCIAL: "Parcial",
	FINAL: "Final",
	TAREA: "Tarea",
};

export function createEvent(title, description, endDate, type, userId) {
	return {
		title: title,
		description: description,
		endDate: new Date(endDate),
		creationDate: new Date(),
		type: type,
		userId: userId
	};
}

export function validateEvent(event) {
	if (!event.title || typeof event.title !== "string") {
		throw new Error("Title is required and must be a string");
	}

	if (!event.description || typeof event.description !== "string") {
		throw new Error("Description is required and must be a string");
	}

	if (!event.endDate || !(event.endDate instanceof Date || isNaN(event.endDate.getTime()))) {
		throw new Error("End date is required and must be a valid date");
	}

	if (!event.type) {
		throw new Error("Type is required");
	}

	if (!Object.values(EventType).includes(event.type)) {
		throw new Error(
			`Type must be one of: ${Object.values(EventType).join(", ")}`
		);
	}

	if (!event.userId || !(event.userId instanceof ObjectId)) {
		throw new Error("userId is required and must be of ObjectId type");
	}

	return true;
}
