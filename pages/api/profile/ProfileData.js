import User from '../../../models/User';
import connectDB from '../../../config/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const client = await connectDB();

			const user = await User.findOne({ username: req.body }).select(
				'-password'
			);

			if (!user) {
				return res.json({ error: 'User does not exist' });
			}

			return res.json({ user });
		} catch (e) {
			return res.status(422).json({ msg: 'try again later' });
		}
	}
}
