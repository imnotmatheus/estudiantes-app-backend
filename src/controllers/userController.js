import { registerUserService, loginUserService } from "../services/userService.js";

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

export async function loginUserController(req, res) {
  const { email, password } = req.body;

  // validacion en capa de servicios

  try {
    const user = await loginUserService({ email, password });
    res.status(200).json({
      message: "Succesfull login",
      user
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", error_message: error.message });
  }
}
