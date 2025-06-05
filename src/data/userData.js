import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { createUser, validateUser } from "../models/userSchema.js";

export const findUserById = async (userId) => {
  const db = getDb();
  const objectId = new ObjectId(userId);
  return await db.collection("users").findOne({ _id: objectId });
};

export async function registerUser({ firstname, lastname, email, password }) {
  const db = await getDb();
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = createUser(firstname, lastname, email, hashedPassword);

  if (validateUser(user)) {
    const result = await db.collection("users").insertOne(newUser);
  }

  return result;
}
