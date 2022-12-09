import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/auth';
import connectDB from '../../../config/db';
import User from '../../../models/User';

export default NextAuth({
	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60,
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				const client = await connectDB();
				console.log(credentials);

				const user = await User.findOne({
					email: credentials.email,
				});

				console.log(user);

				if (!user) {
					client.close();
					throw new Error('No user found');
				}
				const isValid = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!isValid) {
					client.close();
					throw new Error('Could not log you in!');
				}

				return {
					email: user.email,
					name: user.name,
					surname: user.surname,
					avatar: user.avatar,
					username: user.username,
					loggedInUserId: user._id,
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
	secret: process.env.NEXT_PUBLIC_SECRET,
});
