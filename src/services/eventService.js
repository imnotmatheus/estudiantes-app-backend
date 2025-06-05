import { findEventById } from "../data/eventData.js";

export const searchEventById = async (id) => {
    return await findEventById(id);
}