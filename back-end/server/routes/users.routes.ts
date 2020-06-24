import { Router } from 'express';
import UsersCtrl from '../controllers/users.ctrl';

export default class UsersRoutes {
	router: Router;
	usersCtrl: UsersCtrl;

	constructor() {
		this.router = Router();
		this.usersCtrl = new UsersCtrl();
		this.routes();
	}

	routes() {
		this.router.get('/', this.usersCtrl.getAll);
		this.router.get('/:username', this.usersCtrl.getOne);
		this.router.post('/', this.usersCtrl.save);
		this.router.put('/:username', this.usersCtrl.update);
		this.router.delete('/:username', this.usersCtrl.delete);
	}
}
