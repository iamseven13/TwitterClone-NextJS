import Follow from '../../../models/Follow';
import connectDB from '../../../config/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const data = JSON.parse(req.body);

		const { loggedInUsername, followProfile } = data;

		await connectDB();

		try {
			async function isVisitorFollowing() {
				const isFollowing = await Follow.findOne({
					follower: loggedInUsername,
					following: followProfile,
				});
				if (isFollowing) {
					return true;
				} else return false;
			}
			const isFollowing = await isVisitorFollowing();
			return res.json({ isFollowing: isFollowing });
		} catch (e) {
			console.log('there was an error');
		}
	}
}
