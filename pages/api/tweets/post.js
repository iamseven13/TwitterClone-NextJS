import connectToDB from '../../../lib/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const data = JSON.parse(req.body);
		console.log(data);
		try {
			const client = await connectToDB();

			const db = client.db();

			const user = await db
				.collection('tweets')

				.insertOne(data);

			if (!user) {
				return res.json({ error: 'User does not exist' });
			}

			// const { encryptedPass, email, ...others } = user;
			return res.json({ user });
		} catch (e) {
			return res.status(422).json({ msg: 'try again later' });
		}
	}
}
