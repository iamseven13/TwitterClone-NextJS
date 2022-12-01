import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/auth';
import connectToDB from '../../../lib/db';

export default NextAuth({
	session: {
		jwt: true,
		maxAge: 24 * 60 * 60,
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
				return {
					email: user.email,
					name: user.name,
					surname: user.surname,
					avatar: user.avatar,
				};
			},
		}),
	],
	callbacks: {
		async redirect({ url, baseUrl }) {
			if (url.startsWith('/')) return `${url}/home`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
		async session({ session, token, user }) {
			session.accessToken = token.accessToken;
			session.user.id = token.id;

			return { session, token };
		},
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
	},
});
