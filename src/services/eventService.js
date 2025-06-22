import { saveNewEvent, findUserEvents, findEventById, deleteEventById } from "../data/eventData.js";
import { ObjectId } from "mongodb";
import { createEvent, validateEvent } from "../models/eventSchema.js";
import { userExistsByID } from "./userService.js";


export const getUserEvents = async (userId, month, year) => {
    console.log(month, year)
  try {
    if (!userId || !ObjectId.isValid(userId)) {
      const error = new Error("User ID is invalid or required");
      error.status = 400;
      throw error;
    }

    const objectId = new ObjectId(userId);
    const events = await findUserEvents(objectId)
    if (validateMonthAndYear(month, year)) {
        console.log(events)
        return events.filter(e =>
            new Date(e.endDate).getMonth() == month - 1 && new Date(e.endDate).getFullYear() == year
        )
    }
    return events
  } catch (error) {
    if (error.status) {
      throw error;
    }
    throw {
      message: "Internal server error",
      status: 500,
    };
  }
};

function validateMonthAndYear(month, year) {
    return month > 0 && month <= 12 && year > 2000 && year < 2050
}

function validateEventId(id) {
    if (!id) {
        const error = new Error("Event ID is required");
        error.statusCode = 400;
        throw error;
    }

    if (!ObjectId.isValid(id)) {
        const error = new Error("Invalid ID format");
        error.statusCode = 400;
        throw error;
    }
}

export const searchEventById = async (id) => {
    try {
        validateEventId(id);

        const event = await findEventById(id);
        if (!event) {
            const error = new Error("Event not found");
            error.statusCode = 404;
            throw error;
        }

        return event;
    } catch (error) {
        if (error.statusCode) throw error;

        error.statusCode = 500;
        throw error;
    }
};

export const removeEventById = async (id) => {
    try {
        validateEventId(id);

        const deleted = await deleteEventById(id);
        if (!deleted) {
            const error = new Error("Event not found");
            error.statusCode = 404;
            throw error;
        }

        return { message: "Event deleted successfully" };
    } catch (error) {
        if (error.statusCode) throw error;

        error.statusCode = 500;
        throw error;
    }
};

export async function saveNewEventService (title, description, endDate, type, userId) {
    if(!ObjectId.isValid(userId)){
        const error = new Error("UserId is invalid");
        error.status = 400;
        throw error;
    }
    const evento = createEvent(title, description, endDate, type, new ObjectId(userId));

    if(!validateEvent(evento)) {
        return ;
    }

    try {
        await userExistsByID(userId);
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