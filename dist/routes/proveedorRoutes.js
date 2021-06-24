"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../lib/verifyToken");
const proveedorController_1 = __importDefault(require("../controller/proveedorController")); //ruta relativa
class ProveedorRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            req.session.auth = false;
            req.session.user = {};
            res.render("partials/signinForm");
        });
        this.router.get('/listar', verifyToken_1.TokenValidation, proveedorController_1.default.listar);
        this.router.post('/agregar', verifyToken_1.TokenValidation, proveedorController_1.default.agregar);
        this.router.post('/editar', verifyToken_1.TokenValidation, proveedorController_1.default.update);
        this.router.delete('/eliminar/:id', verifyToken_1.TokenValidation, proveedorController_1.default.delete);
    }
}
const proveedorRoutes = new ProveedorRoutes();
exports.default = proveedorRoutes.router;
//# sourceMappingURL=proveedorRoutes.js.map