import connectToDB from '../../../lib/db';
import Post from '../../../models/Post';
import connectDB from '../../../config/db';
import User from '../../../models/User';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const data = JSON.parse(req.body);

		await connectDB();

		try {
			const user = await User.findOne({ username: data.username }).select(
				'-password'
			);

			const { name, username, avatar, surname } = user;

			if (user) {
				const newPost = new Post({
					tweet: data.tweet,
					name,
					username: data.username,
					surname,
					avatar,
					user: user._id,
				});

				const post = await newPost.save();
				return res.json(post);
			} else {
				return res.json('there was a problem');
			}
		} catch (e) {
			return res.status(422).json({ msg: 'try again later' });
		}
	}
}
