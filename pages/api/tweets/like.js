import Post from '../../../models/Post';
import connectDB from '../../../config/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		console.log(req.body);
		const data = JSON.parse(req.body);
		console.log(data);
		await connectDB();

		try {
			const post = await Post.findById({ _id: data.id });
			if (
				post.likes.filter(
					(like) => like.user.toString() === data.userId.toString()
				).length > 0
			) {
				return res.json({ msg: 'Post already been liked.' });
			} else {
				post.likes.unshift({ user: data.userId, username: data.name });
				await post.save();
				return res.json(post.likes);
			}
		} catch (e) {
			console.log(e.message);
		}
	}
}
