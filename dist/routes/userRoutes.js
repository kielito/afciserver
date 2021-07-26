"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../lib/verifyToken");
const userController_1 = __importDefault(require("../controller/userController"));
const validation_1 = require("../lib/validation");
const register_schema_1 = require("../lib/register-schema");
class UserRoutes {
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
        //inicio sesion
        this.router.get('/signin', userController_1.default.signin);
        this.router.post('/signin', userController_1.default.login);
        this.router.post('/signup', verifyToken_1.TokenValidation, register_schema_1.registerSchema, validation_1.validateRequestSchema, userController_1.default.addUser);
        //CRUD
        this.router.get('/list', verifyToken_1.TokenValidation, userController_1.default.list);
        this.router.get('/find/:id', verifyToken_1.TokenValidation, userController_1.default.find);
        this.router.post('/add', verifyToken_1.TokenValidation, userController_1.default.addUser);
        this.router.post('/update/:id', verifyToken_1.TokenValidation, userController_1.default.update); //almaceno los datos modificados
        this.router.delete('/delete/:id', verifyToken_1.TokenValidation, userController_1.default.delete);
        //Fin CRUD
        //CIERRE DE SESION
        this.router.get('/salir', verifyToken_1.TokenValidation, userController_1.default.endSession);
    }
}
//Exportamos el enrutador con 
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=userRoutes.js.map