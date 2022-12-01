import { hashPassword } from '../../../lib/auth';
import connectToDB from '../../../lib/db';

async function handler(req, res) {
	const data = req.body;

	const { email, password, password2 } = data;

	if (
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
		email,
		encryptedPass,
	});

	res.status(201).json({ msg: 'Successfully registered' });
	client.close();
}

export default handler;
