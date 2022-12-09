import connectDB from '../../../config/db';
import Follow from '../../../models/Follow';
import User from '../../../models/User';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const data = JSON.parse(req.body);
		console.log(data.followingUsername);
		// const dataInfo = {
		//     follower: data.s
		// }
		await connectDB();

		try {
			const follow = await Follow.findOneAndDelete({
				follower: data.loggedInUsername,
				following: data.followingUsername,
			});

			return res.json(false);
		} catch (e) {
			return res.status(422).json({ msg: 'try again later' });
		}
	}
}
