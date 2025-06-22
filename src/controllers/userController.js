import {
	registerUserService,
	loginUserService,
	userExistsByID,
	getAllUsersService,
} from "../services/userService.js";

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
			token: result.token,
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

	try {
		const user = await loginUserService({ email, password });
		res.status(200).json({
			message: "Succesfull login",
			user,
		});
	} catch (error) {
		const statusCode = error.statusCode || 500;
		res
			.status(statusCode)
			.json({ error: error.message, error_message: error.message });
	}
}

export async function getUserByIdController(req, res) {
	const userId = req.user._id;

	try {
		const user = await userExistsByID(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		const statusCode = error.statusCode || 500;
		res
			.status(statusCode)
			.json({ error: error.message, error_message: error.message });
	}
}

export async function getAllUsersController(req, res) {
	if (req.user.role !== "admin") {
		res
			.status(401)
			.json({ error_message: "Only admin users can request complete user list" });
	}
	try {
		const users = await getAllUsersService();
		res.status(200).json(users);
	} catch (error) {
		const statusCode = error.statusCode || 500;
		res
			.status(statusCode)
			.json({ error: error.message, error_message: error.message });
	}
}
