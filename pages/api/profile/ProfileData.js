import connectToDB from '../../../lib/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const client = await connectToDB();

			const db = client.db();

			const user = await db.collection('users').findOne({ username: req.body });

			if (!user) {
				res.json({ error: 'User does not exist' });
			}
			const { encryptedPass, email, ...others } = user;
			return res.json({ others });
		} catch (e) {
			return res.status(422).json({ msg: 'try again later' });
		}
	}
}
