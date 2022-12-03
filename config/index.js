const dev = process.env.NODE_ENV !== 'production';

export const server = dev
	? 'http://localhost:3000'
	: 'https://twitter-clone-next-fdsektkmh-iamseven13.vercel.app/';
