import { findUserEvents } from "../data/eventData.js";
import { ObjectId } from "mongodb";

export const getUserEvents = async (userId) => {
  try {
    if (!userId || !ObjectId.isValid(userId)) {
      const error = new Error("User ID is invalid or required");
      error.status = 400;
      throw error;
    }

    const objectId = new ObjectId(userId);
    return await findUserEvents(objectId);
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
