"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.productsRoutes = new products_routes_1.default();
        this.usersRoutes = new users_routes_1.default();
        this.routes();
    }
    config() {
        const MONGO_URI = 'mongodb://localhost/MEAN_DB';
        mongoose_1.default.set('useFindAndModify', false);
        mongoose_1.default
            .connect(MONGO_URI || process.env.MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
            .then(() => console.log('DB is Connected to: ', MONGO_URI));
        //Settigs
        this.app.set('port', process.env.PORT || 3000);
        //Middlewares
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
    }
    routes() {
        this.app.use(index_routes_1.default);
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
