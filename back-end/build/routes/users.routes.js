"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_ctrl_1 = __importDefault(require("../controllers/users.ctrl"));
class UsersRoutes {
    constructor() {
        this.router = express_1.Router();
        this.usersCtrl = new users_ctrl_1.default();
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
exports.default = UsersRoutes;
