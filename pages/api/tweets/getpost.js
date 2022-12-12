import Post from '../../../models/Post';
import connectDB from '../../../config/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const data = JSON.parse(req.body);

		await connectDB();

		try {
			const post = await Post.findOne({ _id: data.postId });

			if (post) {
				return res.json({ post });
			} else return res.json({ msg: 'post doesnt exist' });
		} catch (e) {
			return res.status(422).json({ msg: 'try again later' });
		}
	}
}
