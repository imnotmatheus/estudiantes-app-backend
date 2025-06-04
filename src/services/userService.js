import { registerUser } from "../data/userData.js";

export async function registerUserService({
  firstname,
  lastname,
  email,
  password,
}) {
  try {
    const result = await registerUser({ firstname, lastname, email, password });
    return result;
  } catch (error) {
    if (error.message === "User with this email already exists") {
      throw error;
    }
    throw new Error("error registering user");
  }
}
