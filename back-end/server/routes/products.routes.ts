import ProductsCtrl from '../controllers/products.ctrl';
import { Router } from 'express';

export default class ProductsRoutes {
	router: Router;
	productsCtrl: ProductsCtrl;

	constructor() {
		this.router = Router();
		this.productsCtrl = new ProductsCtrl();
		this.routes();
	}

	routes() {
		this.router.get('/', this.productsCtrl.getAll);
		this.router.get('/:id', this.productsCtrl.getOne);
		this.router.post('/', this.productsCtrl.save);
		this.router.put('/:id', this.productsCtrl.update);
		this.router.delete('/:id', this.productsCtrl.delete);
	}
}
