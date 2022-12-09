import connectDB from '../../../config/db';
import Post from '../../../models/Post';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const data = JSON.parse(req.body);

		console.log(data);

		await connectDB();

		const post = await Post.findOne({ _id: data.tweet });
		if (post) {
			post.comments.unshift({
				user: data.userLoggedIn?.data?.token?.loggedInUserId,
				text: data.comment,
				name: data.userLoggedIn?.data?.token?.name,
				surname: data.userLoggedIn?.data?.token.surname,
				username: data.userLoggedIn?.data?.token.username,
				avatar: data.userLoggedIn?.data?.token.avatar,
			});
		}

		await post.save();
		return res.json({ msg: 'comment sent' });
	}
}
