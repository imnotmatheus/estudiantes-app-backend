import {
	registerUser,
	findUserByEmail,
	findUserById,
	findAllUsers,
} from "../data/userData.js";
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

		// generate JWT token and send with result
		const token = generateToken(result.insertedId, email);

		return { ...result, token };
	} catch (error) {
		throw error;
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
	const token = generateToken(user._id, user.email);

	return { userWithoutPassword, token };
}

export async function userExistsByEmail(email) {
	const user = await findUserByEmail(email);
	if (user) {
		throw new Error("User with this email already exists");
	}
	return user;
}

export async function userExistsByID(id) {
	const user = await findUserById(id);
	if (!user) {
		const error = new Error("User with this id does not exist");
		error.status = 404;
		throw error;
	}
	return user;
}

export async function getAllUsersService() {
	const users = await findAllUsers();
	return users;
}

function generateToken(id, email) {
	const token = { _id: id, email: email }
	if (email === process.env.ADMIN_EMAIL) {
		token.role = "admin"
	}
	
	return jwt.sign(token, process.env.JWT_SECRET, {
		expiresIn: "2h",
	});
}
