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
const User_1 = __importDefault(require("../models/User"));
class UsersCtrl {
    //All users
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.default.find();
            res.json(users);
        });
    }
    // Only one user for username
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Parameters. http://localhost:3000/users/:username
            let user = yield User_1.default.findOne(req.params).populate('products', 'name price -_id');
            res.json(user);
        });
    }
    //Creating new user
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new User_1.default({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
            });
            let dataUser = yield newUser.save();
            res.json(dataUser);
        });
    }
    //Update user
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield User_1.default.findOneAndUpdate(req.params, req.body, { new: true });
            res.json(user);
        });
    }
    //Delete user
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield User_1.default.findOneAndDelete(req.params);
            res.json({ message: `User ${user} deleted!!!!` });
        });
    }
}
exports.default = UsersCtrl;
