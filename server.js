import "dotenv/config";
import app from "./src/app.js";
import { connectToDatabase } from "./src/data/connection.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
	try {
		await connectToDatabase();
		app.listen(PORT, () => {
			console.log("🚀 Server is running on port", PORT);
		});
	} catch (error) {
		console.error("Error starting the server:", error.message);
		process.exit(1);
	}
}

startServer();
