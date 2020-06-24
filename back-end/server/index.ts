import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import indexRoutes from './routes/index.routes';
import ProductsRoutes from './routes/products.routes';
import UsersRoutes from './routes/users.routes';

class Server {
	public app: express.Application;
	public productsRoutes: ProductsRoutes;
	public usersRoutes: UsersRoutes;

	constructor() {
		this.app = express();
		this.config();
		this.productsRoutes = new ProductsRoutes();
		this.usersRoutes = new UsersRoutes();
		this.routes();
	}

	config() {
		const MONGO_URI = 'mongodb://localhost/MEAN_DB';
		mongoose.set('useFindAndModify', false);
		mongoose
			.connect(MONGO_URI || process.env.MONGODB_URL, {
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useCreateIndex: true,
			})
			.then(() => console.log('DB is Connected to: ', MONGO_URI));

		//Settigs
		this.app.set('port', process.env.PORT || 3000);

		//Middlewares
		this.app.use(morgan('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(cors());
	}

	routes() {
		this.app.use(indexRoutes);
		this.app.use('/api/products', this.productsRoutes.router);
		this.app.use('/api/users', this.usersRoutes.router);
	}

	start() {
		this.app.listen(this.app.get('port'), () => {
			console.log('Server on port:', this.app.get('port'));
		});
	}
}

const server = new Server();
server.start();
