import connectDB from '../../../config/db';
import Post from '../../../models/Post';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		try {
			const posts = await Post.find().sort({ date: -1 });
			return res.json(posts);
		} catch (e) {
			return res.status(422).json({ msg: 'try again later' });
		}
	}
}
