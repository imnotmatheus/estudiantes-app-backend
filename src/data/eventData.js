import { ObjectId } from "mongodb";
import { getDb } from "./connection.js";

export async function findEventById(id) {
    const db = getDb();
    const event = await db.collection("events").findOne({_id: new ObjectId(id)});
    return event;
}

export async function deleteEventById(id) {
    const db = getDb();
    const result = await db.collection("events").deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}