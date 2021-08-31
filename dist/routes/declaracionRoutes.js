"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../lib/verifyToken");
const declaracionController_1 = __importDefault(require("../controller/declaracionController"));
class DeclaracionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //se asocian rutas con el metodo de una clase existente:
        this.router.get('/', (req, res) => {
            req.session.auth = false;
            req.session.user = {};
            res.render("partials/signinForm");
        });
        //CRUD
        this.router.post('/add', verifyToken_1.TokenValidation, declaracionController_1.default.altaDecJuradaIndividual);
        //Fin CRUD
        //CIERRE DE SESION
        this.router.get('/salir', verifyToken_1.TokenValidation, declaracionController_1.default.endSession);
    }
}
//Exportamos el enrutador con 
const declaracionRoutes = new DeclaracionRoutes();
exports.default = declaracionRoutes.router;
//# sourceMappingURL=declaracionRoutes.js.map