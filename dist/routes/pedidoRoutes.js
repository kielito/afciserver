"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidoController_1 = __importDefault(require("../controller/pedidoController")); //ruta relativa
class PedidoRoutes {
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
        //Home de pedido        
        this.router.get('/home', pedidoController_1.default.home);
        this.router.post('/home', pedidoController_1.default.home);
        this.router.get('/ingresos', pedidoController_1.default.control);
        this.router.post('/ingresos', pedidoController_1.default.control);
        //CRUD
        /*this.router.get('/list',userController.list);
        this.router.get('/find/:id',userController.find);
        this.router.post('/add',userController.addUser);*/
        this.router.get('/update/:id', pedidoController_1.default.procesar); //dibujo la vista		
        this.router.post('/update/:id', pedidoController_1.default.update); //almaceno los datos modificados
        this.router.delete('/delete/:id', pedidoController_1.default.delete);
        this.router.get('/delete/:id', pedidoController_1.default.delete);
        /*
        //this.router.put('/update/:id',userController.procesar);
        

        
        //Fin CRUD


        //CONTROL
        this.router.get('/control',userController.control);
        //this.router.get('/procesar/id',userController.procesar);
        //this.router.post('/procesar/:id',userController.procesar);

        //CIERRE DE SESION
        this.router.get('/salir',userController.endSession);*/
    }
}
//Exportamos el enrutador con 
const pedidoRoutes = new PedidoRoutes();
exports.default = pedidoRoutes.router;
//# sourceMappingURL=pedidoRoutes.js.map