"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../models/Product"));
class ProductsCtrl {
    //All products
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield Product_1.default.find(req.params);
            res.json(products);
        });
    }
    // Only one product for id
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Parameters. http://localhost:3000/products/id
            let product = yield Product_1.default.findById(req.params.id);
            res.json(product);
        });
    }
    //Creating new product
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = new Product_1.default({
                name: req.body.name,
                price: req.body.price,
                sku: req.body.sku,
                description: req.body.description,
                category: req.body.category,
            });
            let dataProduct = yield newProduct.save();
            res.json(dataProduct);
        });
    }
    //Update product
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = yield Product_1.default.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.json(product);
        });
    }
    //Delete product
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = yield Product_1.default.findByIdAndDelete(req.params);
            res.json({ message: `Product ${product} deleted!!!!` });
        });
    }
}
exports.default = ProductsCtrl;
