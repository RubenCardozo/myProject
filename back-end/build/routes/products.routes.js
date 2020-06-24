"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_ctrl_1 = __importDefault(require("../controllers/products.ctrl"));
const express_1 = require("express");
class ProductsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.productsCtrl = new products_ctrl_1.default();
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
exports.default = ProductsRoutes;
