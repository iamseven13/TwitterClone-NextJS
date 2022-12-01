import { MongoClient } from 'mongodb';

export default async function connectToDB() {
	const client = await MongoClient.connect(
		'mongodb+srv://todo-app-user:ZZkz16FePdqjfNuX@cluster0.23oaz.mongodb.net/next-js-twitter?retryWrites=true&w=majority'
	);
	return client;
}
