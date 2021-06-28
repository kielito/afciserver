"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../lib/verifyToken");
const comentarioController_1 = __importDefault(require("../controller/comentarioController")); //ruta relativa
const archivoController_1 = __importDefault(require("../controller/archivoController"));
const multer_1 = __importDefault(require("../lib/multer"));
class ComentarioRoutes {
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
        this.router.get('/archivos/:id', verifyToken_1.TokenValidation, archivoController_1.default.buscarArchivo);
        this.router.delete('/archivos/:id', verifyToken_1.TokenValidation, archivoController_1.default.eliminarArchivo);
        this.router.get('/archivos', verifyToken_1.TokenValidation, archivoController_1.default.buscarArchivos);
        this.router.post('/archivos', verifyToken_1.TokenValidation, multer_1.default.single('image'), archivoController_1.default.crearArchivo);
        //CRUD
        this.router.get('/list', verifyToken_1.TokenValidation, comentarioController_1.default.list);
        this.router.get('/find/:id', verifyToken_1.TokenValidation, comentarioController_1.default.find);
        this.router.post('/add', verifyToken_1.TokenValidation, comentarioController_1.default.add);
        this.router.post('/update/:id', verifyToken_1.TokenValidation, comentarioController_1.default.update); //almaceno los datos modificados        
        this.router.delete('/delete/:id', verifyToken_1.TokenValidation, comentarioController_1.default.delete);
        //Fin CRUD     
        //CIERRE DE SESION
        this.router.get('/salir', comentarioController_1.default.endSession);
    }
}
//Exportamos el enrutador con 
const comentarioRoutes = new ComentarioRoutes();
exports.default = comentarioRoutes.router;
//# sourceMappingURL=comentarioRoutes.js.map