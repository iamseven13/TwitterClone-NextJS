import Post from '../../../models/Post';
import connectDB from '../../../config/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const data = JSON.parse(req.body);

		await connectDB();

		try {
			const post = await Post.findById({ _id: data.id });
			if (
				post.likes.filter((like) => like.user.toString() === data.userId)
					.length === 0
			) {
				return res.json({ msg: 'Post has not yet been liked.' });
			} else {
				const removeIdx = post.likes
					.map((like) => like.user.toString())
					.indexOf(data.userId);
				console.log(removeIdx);
				post.likes.splice(removeIdx, 1);

				await post.save();
				return res.json(post.likes);
			}
		} catch (e) {
			console.log(e.message);
		}
	}
}
