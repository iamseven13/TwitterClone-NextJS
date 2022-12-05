import connectDB from '../../../config/db';
import Follow from '../../../models/Follow';
import User from '../../../models/User';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		console.log(req.body);
		const dataFollow = JSON.parse(req.body);

		await connectDB();

		try {
			const user = await User.findOne({
				username: dataFollow.loggedInUsername,
			}).select('-password');
			const { loggedInUsername, followingUsername } = dataFollow;

			console.log(loggedInUsername, followingUsername);
			// const isFollowing = await Follow.find({
			// 	loggedInUsername,
			// 	followingUsername,
			// });
			// if (isFollowing) {
			// 	console.log('already following');
			// }
			if (user) {
				const newFollow = new Follow({
					follower: loggedInUsername,
					following: followingUsername,
				});

				const follow = await newFollow.save();
				console.log(follow);
				return;
			} else {
				console.log('there was a problem');
			}
		} catch (e) {
			return res.status(422).json({ msg: 'try again later' });
		}
	}
}
