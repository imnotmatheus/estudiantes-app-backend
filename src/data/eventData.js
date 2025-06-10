import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";

export const findEventById = async (eventId) => {
	const db = getDb();
	const objectId = new ObjectId(eventId);

	return await db.collection("events").findOne({ _id: objectId });
};

export async function saveNewEvent(event) {
    const db = getDb();
    const result = await db.collection("events").insertOne(event);
    return result.insertedId;
}