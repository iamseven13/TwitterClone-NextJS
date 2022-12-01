import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/auth';
import connectToDB from '../../../lib/db';

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				const client = await connectToDB();

				const usersCollection = client.db().collection('users');

				const user = await usersCollection.findOne({
					email: credentials.email,
				});

				if (!user) {
					client.close();
					throw new Error('No user found');
				}
				const isValid = await verifyPassword(
					credentials.password,
					user.encryptedPass
				);

				if (!isValid) {
					client.close();
					throw new Error('Could not log you in!');
				}
				client.close();
				return {};
			},
		}),
	],
});
