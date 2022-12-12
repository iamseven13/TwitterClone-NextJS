import Post from '../../../models/Post';
import connectDB from '../../../config/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const data = JSON.parse(req.body);
		console.log(data);
		await connectDB();

		try {
			const post = await Post.findById({ _id: data.id });
			console.log(post.retweets);
			if (post) {
				// post.retweets.filter((retweet) => retweet.username !== data.name);
				const removeIdx = post.retweets
					.map((retweet) => retweet.user.toString())
					.indexOf(data.userId);

				post.retweets.splice(removeIdx, 1);

				await post.save();
				return res.json({ msg: 'retweeted succesfully' });
			}
		} catch (e) {
			console.log(e.message);
		}
	}
}
