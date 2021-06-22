"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pedidoModel_1 = __importDefault(require("../models/pedidoModel"));
class PedidoController {
    home(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                req.flash('error', 'Debes iniciar sesion para ver esta seccion!'); //Dos parametros: primero variable, segundo el valor que tendra esa variable
                res.redirect("../user/signin");
            }
            res.render("partials/homepedido");
        });
    }
    //CRUD
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const autos = yield pedidoModel_1.default.listar();
            return res.json(autos);
        });
    }
    /*
        public async find(req:Request,res:Response){
            const { id } = req.params;
            const usuario = await userModel.buscarId(id);
            if (usuario)
                return res.json(usuario);
            res.status(404).json({ text: "User doesn't exists" });
        }
    
        public async addUser(req:Request,res:Response){
            const usuario = req.body;
                   
            if(usuario.password.length === 0){
                req.flash('error','Debe ingresar una clave!'); //Dos parametros: primero variable, segundo el valor que tendra esa variable
                return res.redirect("./signup");
            }
    
            if(usuario.password !== usuario.repassword){
                req.flash('error','Verifique la clave ingresada!'); //Dos parametros: primero variable, segundo el valor que tendra esa variable
                return res.redirect("./signup");
            }
            delete usuario.repassword;
    
            const busqueda = await userModel.buscarUsuario(usuario.nombre, usuario.email);
            usuario.password = await userModel.encriptarPassword(usuario.password);
    
            if (!busqueda) {
                const result = await userModel.crear(usuario);
                
                if (!result)
                    res.status(404).json({ text: "No se pudo crear el usuario" });
                req.flash('confirmacion','Usuario Registrado correctamente!');
                
                return res.redirect("./signin");
            }
            req.flash('error','El usuario y/o email ya se encuentra registrado!'); //Dos parametros: primero variable, segundo el valor que tendra esa variable
            return res.redirect("./signup");
        }*/
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                req.flash('error', 'Debe iniciar sesion para ver esta seccion'); //Dos parametros: primero variable, segundo el valor que tendra esa variable
                res.redirect("../user/signin");
            }
            const { id } = req.params;
            const auto = yield pedidoModel_1.default.buscarId(id);
            if (req.body.telefono === "") {
                req.flash('error', 'El telefono no puede estar vacío!');
                return res.render("partials/update_auto", { auto, home: req.session.user, mi_session: true });
            }
            if (req.body.descripcion === "") {
                req.flash('error', 'La descripcion no puede estar vacía!');
                return res.render("partials/update_auto", { auto, home: req.session.user, mi_session: true });
            }
            else {
                const result = yield pedidoModel_1.default.actualizar(req.body, id);
                if (result) {
                    req.flash('confirmacion', 'Auto "' + req.body.descripcion + '" actualizado correctamente!');
                    return res.redirect("../ingresos");
                }
                req.flash('error', 'El auto ya se encuentra registrado!'); //Dos parametros: primero variable, segundo el valor que tendra esa variable
                return res.render("partials/update_auto", { auto, home: req.session.user, mi_session: true });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                req.flash('error', 'Debe iniciar sesion para ver esta seccion'); //Dos parametros: primero variable, segundo el valor que tendra esa variable
                res.redirect("../user/signin");
            }
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield pedidoModel_1.default.eliminar(id);
            console.log(req.body);
            req.flash('confirmacion', 'Se eliminó el Auto correctamente!');
            res.redirect('../ingresos');
        });
    }
    //FIN CRUD
    control(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                req.flash('error', 'Debe iniciar sesion para ver esta seccion'); //Dos parametros: primero variable, segundo el valor que tendra esa variable
                res.redirect("../user/signin");
            }
            const autos = yield pedidoModel_1.default.listar();
            res.render('partials/ingresos', { auto: autos, mi_session: true });
        });
    }
    procesar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                req.flash('error', 'Debes iniciar sesion para ver esta seccion');
                return res.redirect("../user/signin");
            }
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const auto = yield pedidoModel_1.default.buscarId(id);
            if (auto !== undefined) {
                res.render("partials/update_auto", { auto, home: req.session.user, mi_session: true });
            }
        });
    }
}
const pedidoController = new PedidoController();
exports.default = pedidoController;
//# sourceMappingURL=pedidoController.js.map