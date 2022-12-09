import Post from '../../../models/Post';

export default async function handle(req, res) {
	if (req.method === 'POST') {
		const data = JSON.parse(req.body);

		try {
			const posts = await Post.find({ username: data.username });

			if (posts) {
				return res.json(posts);
			} else {
				return res.json(false);
			}
		} catch (e) {
			console.log(e.message);
		}
	}
}
