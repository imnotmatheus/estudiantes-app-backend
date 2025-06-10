import { ObjectId } from "mongodb";
import { saveNewEvent } from "../data/eventData.js";
import { createEvent, validateEvent } from "../models/eventSchema.js";
import { findUserById } from "../data/userData.js";


export async function saveNewEventService (title, description, endDate, type, userId) {
    const evento = createEvent(title, description, endDate, type, new ObjectId(userId));

    if(!validateEvent(evento)) {
        return ;
    }

    try {
        await ensureUserExistsById(userId);
        const idEvent = await saveNewEvent(evento);
        return {_id: idEvent, ...evento};

    } catch(error) {
        throw new Error(error.message);
    }
}

export async function ensureUserExistsById(userId) {
    const user = await findUserById(userId);
    if (!user) {
        throw new Error("El usuario especificado no existe");
    }
    return user;
}