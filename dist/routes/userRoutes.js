"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../lib/verifyToken");
const userController_1 = __importDefault(require("../controller/userController")); //ruta relativa
const archivoController_1 = require("../controller/archivoController");
const multer_1 = __importDefault(require("../lib/multer"));
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
        //archivos
        this.router.get('/archivos', archivoController_1.leerArchivo, userController_1.default.signup);
        this.router.post('/archivos', multer_1.default.single('imagen'), archivoController_1.crearArchivo, userController_1.default.addUser);
        //inicio sesion
        this.router.get('/signin', userController_1.default.signin);
        this.router.post('/signin', userController_1.default.login); //Paso 15
        //registro - Paso 18
        this.router.get('/signup', userController_1.default.signup);
        this.router.post('/signup', userController_1.default.addUser);
        //Home del usuario        
        this.router.get('/home', verifyToken_1.TokenValidation, userController_1.default.home);
        this.router.post('/home', verifyToken_1.TokenValidation, userController_1.default.home);
        //CRUD
        this.router.get('/list', verifyToken_1.TokenValidation, userController_1.default.list);
        this.router.get('/find/:id', verifyToken_1.TokenValidation, userController_1.default.find);
        this.router.post('/add', verifyToken_1.TokenValidation, userController_1.default.addUser);
        this.router.get('/update/:id', verifyToken_1.TokenValidation, userController_1.default.procesar); //dibujo la vista		
        this.router.post('/update/:id', verifyToken_1.TokenValidation, userController_1.default.update); //almaceno los datos modificados
        //this.router.put('/update/:id',userController.procesar);
        this.router.delete('/delete/:id', verifyToken_1.TokenValidation, userController_1.default.delete);
        //this.router.get('/delete/:id',TokenValidation,userController.delete);
        //Fin CRUD
        this.router.get('/activate/:id', userController_1.default.activar);
        //CONTROL
        this.router.get('/control', userController_1.default.control);
        //this.router.get('/procesar/id',userController.procesar);
        //this.router.post('/procesar/:id',userController.procesar);        
        //CIERRE DE SESION
        this.router.get('/salir', userController_1.default.endSession);
    }
}
//Exportamos el enrutador con 
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=userRoutes.js.map