import { hashPassword } from '../../../lib/auth';
import connectToDB from '../../../lib/db';
import gravatar from 'gravatar';
import User from '../../../models/User';
import connectDB from '../../../config/db';

async function handler(req, res) {
	const data = req.body;
	const client = await connectDB();

	const { name, surname, email, username, password, password2 } = data;

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

	const newUsername = username.toLowerCase().trim();
	console.log(newUsername);

	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.status(422).json({ msg: 'User already exists' });
		}

		const avatar = gravatar.url(email, {
			s: '200',
			r: 'pg',
			d: 'mm',
		});

		const sendAvatar = avatar.replace('//', '');

		const encryptedPass = await hashPassword(password);

		user = new User({
			name,
			surname,
			email,
			username: newUsername,
			avatar: sendAvatar,
			password: encryptedPass,
		});

		await user.save();

		return res.json({ msg: 'user successfully registered' });
	} catch (e) {
		console.log(e.message);
	}
}

export default handler;
