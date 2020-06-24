import { Request, Response } from 'express';
import Product from '../models/Product';
export default class ProductsCtrl {
	//All products
	async getAll(req: Request, res: Response): Promise<void> {
		const products = await Product.find(req.params);
		res.json(products);
	}

	// Only one product for id
	async getOne(req: Request, res: Response): Promise<void> {
		//Parameters. http://localhost:3000/products/id
		let product = await Product.findById(req.params.id);
		res.json(product);
	}

	//Creating new product
	async save(req: Request, res: Response): Promise<void> {
		const newProduct = new Product({
			name: req.body.name,
			price: req.body.price,
			sku: req.body.sku,
			description: req.body.description,
			category: req.body.category,
		});
		let dataProduct = await newProduct.save();
		res.json(dataProduct);
	}

	//Update product
	async update(req: Request, res: Response): Promise<void> {
		let product = await Product.findByIdAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ new: true }
		);
		res.json(product);
	}

	//Delete product
	async delete(req: Request, res: Response): Promise<void> {
		let product = await Product.findByIdAndDelete(req.params);
		res.json({ message: `Product ${product} deleted!!!!` });
	}
}
