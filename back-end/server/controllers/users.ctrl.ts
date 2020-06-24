import { Request, Response } from 'express';
import User from '../models/User';

export default class UsersCtrl {
	//All users
	async getAll(req: Request, res: Response): Promise<void> {
		const users = await User.find();
		res.json(users);
	}

	// Only one user for username
	async getOne(req: Request, res: Response): Promise<void> {
		//Parameters. http://localhost:3000/users/:username
		let user = await User.findOne(req.params).populate(
			'products',
			'name price -_id'
		);
		res.json(user);
	}

	//Creating new user
	async save(req: Request, res: Response): Promise<void> {
		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			username: req.body.username,
		});
		let dataUser = await newUser.save();
		res.json(dataUser);
	}

	//Update user
	async update(req: Request, res: Response): Promise<void> {
		let user = await User.findOneAndUpdate(req.params, req.body, { new: true });
		res.json(user);
	}

	//Delete user
	async delete(req: Request, res: Response): Promise<void> {
		let user = await User.findOneAndDelete(req.params);
		res.json({ message: `User ${user} deleted!!!!` });
	}
}
