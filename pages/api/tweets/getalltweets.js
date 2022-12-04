import connectDB from '../../../config/db';
import connectToDB from '../../../lib/db';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		try {
			const client = await connectToDB();
			return res.json({ msg: 'not working' });
			// const db = client.db();
			// const tweets = await db.collection('tweets').find().pretty();

			// console.log(tweets);

			// if (!tweets) {
			// 	return res.json({ error: 'Tweets not found' });
			// }

			// // const { encryptedPass, email, ...others } = user;
			// return res.json({ tweets });
		} catch (e) {
			return res.status(422).json({ msg: 'try again later' });
		}
	}
}
