import { MongoClient } from 'mongodb';

export default async function connectToDB() {
	const client = await MongoClient.connect(process.env.MONGO);
	return client;
}
