import { registerUser, findUserByEmail, findUserById } from "../data/userData.js";
import { validateUser, createUser } from "../models/userSchema.js";
import bcrypt from "bcrypt";

export async function registerUserService({
  firstname,
  lastname,
  email,
  password,
}) {
  const newUser = createUser(firstname, lastname, email, password);
  if (!validateUser(newUser)) {
    return;
  }
  try {
    await userExistsByEmail(email);
    newUser.password = await bcrypt.hash(password, 10);
    const result = await registerUser(newUser);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function userExistsByEmail(email) {
  const user = await findUserByEmail(email);
  if (user) {
    throw new Error("User with this email already exists");
  }
  return user;
}

export async function ensureUserExistsById(userId) {
    const user = await findUserById(userId);
    if (!user) {
      const error = new Error("El usuario especificado no existe");
      error.status = 404;
      throw error;
    }
    return user;
}
