import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";

export const findEventById = async (id) => {
	const db = getDb();

	return await db.collection("events").findOne({ _id: new ObjectId(id)});
};

export const findUserEvents = async (userId) => {
	const db = getDb();

	return await db.collection("events").find({ userId: userId }).toArray();
};

export async function deleteEventById(id) {
    const db = getDb();
    const result = await db.collection("events").deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}