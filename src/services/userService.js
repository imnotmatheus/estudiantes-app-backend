import { registerUser, findUserByEmail } from "../data/userData.js";
import { validateUser, createUser } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export async function loginUserService({ email, password }) {
	const user = await findUserByEmail(email);

	if (!user) {
		throw new Error("Invalid credentials");
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("Invalid credentials");
	}

	// No devolver password
	const { password: _pw, ...userWithoutPassword } = user;

	// Generar JWT
	const token = jwt.sign(
		{ _id: user._id, username: user.username, email: user.email },
		process.env.JWT_SECRET,
		{ expiresIn: "2h" }
	);

	return { userWithoutPassword, token };
}

export async function userExistsByEmail(email) {
	const user = await findUserByEmail(email);
	if (user) {
		throw new Error("User with this email already exists");
	}
	return user;
}
