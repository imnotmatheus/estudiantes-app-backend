import { ObjectId } from "mongodb";
import { findEventById } from "../data/eventData.js";

export const searchEventById = async (id) => {
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

    try {
        const event = await findEventById(id);

        if (!event) {
            const error = new Error("Event not found");
            error.statusCode = 404;
            throw error;
        }

        return event;
    } catch (error) {
        if (error.statusCode) {
            throw error;
        }

        error.statusCode = 500;
        throw error;
    }
};
