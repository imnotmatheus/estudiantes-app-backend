import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";

export const findUserById = async (userId) => {
	const db = getDb();
	const objectId = new ObjectId(userId);
	return await db.collection("users").findOne({ _id: objectId });
};
