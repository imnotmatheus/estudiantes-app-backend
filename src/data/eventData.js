import { ObjectId } from "mongodb";

export async function findEventById(id) {
    const db = getDb(); //acá cambiar por la Db correcta
    const event = await db.collection("events").findOne({_id: new ObjectId(id)});
    console.log(event);
    return event;
}