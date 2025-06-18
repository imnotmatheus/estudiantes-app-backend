import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
	throw new Error("❌ Please define the MONGODB_URI environment variable");
}

let client;
let db;

export async function connectToDatabase() {
	if (!client) {
		try {
			client = new MongoClient(uri);
			await client.connect();
			db = client.db(process.env.DB_NAME);
			console.log("✅ Connected to the database");
		} catch (error) {
			console.error("❌ Failed to connect to the database", error);
			throw new Error("❌ Failed to connect to the database");
		}

		return db;
	}
}

export function getDb() {
	if (!db) {
		throw new Error(
			"❌ Database not initialized. Call connectToDatabase first."
		);
	}

	return db;
}
