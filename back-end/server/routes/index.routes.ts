import { Request, Response, Router } from 'express';

class IndexRoutes {
	router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get('/', (req: Request, res: Response): void => {
			res.send('Index Page');
		});
	}
}

const indexRoutes = new IndexRoutes();
indexRoutes.routes();
export default indexRoutes.router;
