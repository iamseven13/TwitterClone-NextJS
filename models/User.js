import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	name: {
		type: String,
	},
	surname: {
		type: String,
	},
	username: {
		type: String,
	},
	email: {
		type: String,

		unique: true,
	},
	password: {
		type: String,
	},

	following: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users',
			},
		},
	],

	followers: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users',
			},
		},
	],

	avatar: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
