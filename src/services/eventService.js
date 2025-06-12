import { ObjectId } from "mongodb";
import { saveNewEvent } from "../data/eventData.js";
import { createEvent, validateEvent } from "../models/eventSchema.js";
import { ensureUserExistsById } from "./userService.js";


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
        if (error.status) {
            throw error;
        }

        throw {
            message: "Internal server error",
            status: 500,
        };
    }
};