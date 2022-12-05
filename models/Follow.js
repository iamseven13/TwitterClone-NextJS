import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FollowSchema = new Schema({
	follower: {
		type: String,
		ref: 'users',
	},
	following: {
		type: String,
		ref: 'users',
	},
});

module.exports =
	mongoose.models.Follow || mongoose.model('Follow', FollowSchema);
