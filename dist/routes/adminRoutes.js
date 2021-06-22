"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../lib/verifyToken");
const adminController_1 = __importDefault(require("../controller/adminController")); //ruta relativa
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
        //Home del usuario        
        this.router.get('/home', verifyToken_1.TokenValidation, adminController_1.default.home);
        this.router.get('/listarpedidos', verifyToken_1.TokenValidation, adminController_1.default.listarPedidos);
        this.router.get('/abmproductos', verifyToken_1.TokenValidation, adminController_1.default.abmProductos);
        this.router.post('/agregarproducto', verifyToken_1.TokenValidation, adminController_1.default.agregarProductos);
        this.router.post('/update', verifyToken_1.TokenValidation, adminController_1.default.update);
        this.router.get('/delete/:id', verifyToken_1.TokenValidation, adminController_1.default.delete);
    }
}
const articuloRoutes = new ArticuloRoutes();
exports.default = articuloRoutes.router;
//# sourceMappingURL=adminRoutes.js.map