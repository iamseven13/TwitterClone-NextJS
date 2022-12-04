import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	surname: {
		type: String,
	},
	newUsername: {
		type: String,
	},
	email: {
		type: String,

		unique: true,
	},
	password: {
		type: String,
	},

	avatar: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
