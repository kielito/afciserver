"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../lib/verifyToken");
const articuloController_1 = __importDefault(require("../controller/articuloController")); //ruta relativa
class ArticuloRoutes {
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
        this.router.get('/listar', verifyToken_1.TokenValidation, articuloController_1.default.listar);
        this.router.post('/agregarproducto', verifyToken_1.TokenValidation, articuloController_1.default.agregarProductos);
        this.router.post('/editar', verifyToken_1.TokenValidation, articuloController_1.default.update);
        this.router.post('/eliminar', verifyToken_1.TokenValidation, articuloController_1.default.delete);
    }
}
const articuloRoutes = new ArticuloRoutes();
exports.default = articuloRoutes.router;
//# sourceMappingURL=articuloRoutes.js.map