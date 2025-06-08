import { registerUserService } from "../services/userService.js";

export async function registerUserController(req, res) {
  const { firstname, lastname, email, password } = req.body;

  try {
    const result = await registerUserService({
      firstname,
      lastname,
      email,
      password,
    });
    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertedId,
    });
  } catch (error) {
    if (error.message.includes("User with this email already exists")) {
      return res.status(409).json({ error: error.message });
    }
    res
      .status(500)
      .json({ error: "Internal server error", error_message: error.message });
  }
}
