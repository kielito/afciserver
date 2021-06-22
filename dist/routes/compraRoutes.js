"use strict";
/*******************************************************************************
*		DNI:33.111.151
*		APELLIDO/S: GOMEZ
*		NOMBRE/S: LEANDRO
*		PARCIAL: 2
*		FECHA: 17/06/2021
*******************************************************************************/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../lib/verifyToken");
const compraController_1 = __importDefault(require("../controller/compraController")); //ruta relativa
class CompraRoutes {
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
        this.router.get('/carrito', verifyToken_1.TokenValidation, compraController_1.default.listar);
        //this.router.post('/carrito',compraController.listar);    
        //this.router.get('/compra',compraController.crearcompra);
        this.router.post('/compra', verifyToken_1.TokenValidation, compraController_1.default.crearcompra);
        this.router.post('/carrito', verifyToken_1.TokenValidation, compraController_1.default.crearcarrito);
    }
}
const compraRoutes = new CompraRoutes();
exports.default = compraRoutes.router;
//# sourceMappingURL=compraRoutes.js.map