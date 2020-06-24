import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Product',
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default model('User', UserSchema);
