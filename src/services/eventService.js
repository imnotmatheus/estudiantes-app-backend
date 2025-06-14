import { ObjectId } from "mongodb";
import { findEventById, deleteEventById } from "../data/eventData.js";

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
