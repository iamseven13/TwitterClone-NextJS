import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	tweet: {
		type: String,
	},
	name: {
		type: String,
	},
	username: {
		type: String,
		ref: 'users',
	},
	surname: {
		type: String,
	},
	avatar: {
		type: String,
	},

	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users',
			},
			username: {
				type: String,
			},
		},
	],
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users',
			},
			text: {
				type: String,
			},
			name: { type: String },
			surname: { type: String },
			username: { type: String },
			avatar: { type: String },
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	retweets: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users',
			},
			username: {
				type: String,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema);
