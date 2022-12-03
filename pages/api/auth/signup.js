import { hashPassword } from '../../../lib/auth';
import connectToDB from '../../../lib/db';

async function handler(req, res) {
	const data = req.body;

	const { name, surname, email, username, password, password2 } = data;
	let avatar =
		'https://images.unsplash.com/photo-1524787452540-d4034dc921e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

	if (
		!name ||
		!surname ||
		!email ||
		!email.includes('@') ||
		!password ||
		password.trim().length < 5 ||
		password !== password2
	) {
		res.status(422).json({
			msg: 'Invalid input - password should be at least 5 characters long',
		});
		return;
	}

	const client = await connectToDB();
	const db = client.db();

	const existingUser = await db.collection('users').findOne({ email: email });

	if (existingUser) {
		res.status(422).json({ msg: 'User already exists' });
		client.close();
		return;
	}

	const encryptedPass = await hashPassword(password);

	const result = await db.collection('users').insertOne({
		name,
		surname,
		avatar,
		username,
		email,
		encryptedPass,
	});

	res.status(201).json({ msg: 'Successfully registered' });
	client.close();
}

export default handler;
