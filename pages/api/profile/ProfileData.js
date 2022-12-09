import User from '../../../models/User';
import connectDB from '../../../config/db';

export default async function handler(req, res) {
	console.log(`this is from profiledata ${req.body}`);
	await connectDB();
	const username = req.body;
	if (req.method === 'POST') {
		try {
			const user = await User.findOne({ username: username }).select(
				'-password -email -_id'
			);

			if (!user) {
				return res.json({ error: 'User does not exist' });
			}
			console.log(`this is from the api ${user}`);
			return res.json({ user });
		} catch (e) {
			return res.status(422).json({ msg: 'try again later' });
		}
	}
}
