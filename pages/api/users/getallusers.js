import User from '../../../models/User';
import connectDB from '../../../config/db';

export default async function handle(req, res) {
	await connectDB();
	if (req.method === 'GET') {
		try {
			const users = await User.find({}).select('-password -email');

			if (users) {
				return res.json(users);
			} else {
				return res.json(false);
			}
		} catch (e) {
			console.log(e.message);
		}
	}
}
