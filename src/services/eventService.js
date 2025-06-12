import { findEventById } from "../data/eventData.js";

export const searchEventById = async (id) => {
    if (!id) {
        const error = new Error("Es requerido el ID del Evento");
        error.statusCode = 400;
        throw error;
    }

    const event = await findEventById(id);

    if (!event) {
        const error = new Error("Evento no encontrado");
        error.statusCode = 404;
        throw error;
    }

    return event;
};
