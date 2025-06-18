export function createUser(firstname, lastname, email, password) {
	return {
		firstname,
		lastname,
		creationDate: new Date(),
		email,
		password,
	};
}

export function validateUser(user) {
	if (!user.firstname || typeof user.firstname !== "string") {
		throw new Error("First name is required and must be a string");
	}

	if (!user.lastname || typeof user.lastname !== "string") {
		throw new Error("Last name is required and must be a string");
	}

	if (
		!user.email ||
		typeof user.email !== "string" ||
		!isValidEmail(user.email)
	) {
		throw new Error("Valid email is required");
	}

	if (
		!user.password ||
		typeof user.password !== "string" ||
		user.password.length < 6
	) {
		throw new Error("Password is required and must be at least 6 characters");
	}

	return true;
}

function isValidEmail(email) {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
}
