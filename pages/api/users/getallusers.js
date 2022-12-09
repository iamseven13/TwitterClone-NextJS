import connectDB from '../../../config/db';
import User from '../../../models/User';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const user = await User.find({}).select('-password -email');

		return res.json(user);
	}
}
