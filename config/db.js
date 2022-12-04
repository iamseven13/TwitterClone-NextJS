import mongoose from 'mongoose';
import config from 'config';

// const db = config.get('mongoURL');

const connectDB = async () => {
	try {
		const client = await mongoose.connect(
			'mongodb+srv://todo-app-user:ZZkz16FePdqjfNuX@cluster0.23oaz.mongodb.net/next-js-twitter?retryWrites=true&w=majority'
		);
		console.log('MongoDB Connected');
	} catch (e) {
		console.log(e.message);
	}
};

export default connectDB;
