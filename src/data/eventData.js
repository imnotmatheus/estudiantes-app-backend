import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";

export const findEventById = async (eventId) => {
	const db = getDb();
	const objectId = new ObjectId(eventId);

	return await db.collection("events").findOne({ _id: objectId });
};
