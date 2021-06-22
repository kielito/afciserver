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
const adminModel_1 = __importDefault(require("../models/adminModel"));
class ArticuloController {
    //HOME
    home(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                req.flash('error', 'Debes iniciar sesion para ver esta seccion!');
                res.redirect("../user/signin");
            }
            else {
                if (req.session.user.rol !== "admin") {
                    req.flash('error', 'Debes tener perfil de Admin para ver esta seccion!');
                    res.redirect("../user/home");
                }
                res.render("partials/homeadmin");
            }
        });
    }
    listarPedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                req.flash('error', 'Debes iniciar sesion para ver esta seccion!');
                res.redirect("../user/signin");
            }
            else {
                if (req.session.user.rol !== "admin") {
                    req.flash('error', 'Debes tener perfil de Admin para ver esta seccion!');
                    res.redirect("../user/home");
                }
                const pedido = yield adminModel_1.default.listarpedidos();
                res.render('partials/pedidos', { pedidos: pedido });
            }
        });
    }
    abmProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                req.flash('error', 'Debes iniciar sesion para ver esta seccion!');
                res.redirect("../user/signin");
            }
            else {
                if (req.session.user.rol !== "admin") {
                    req.flash('error', 'Debes tener perfil de Admin para ver esta seccion!');
                    res.redirect("../user/home");
                }
                const producto = yield adminModel_1.default.listarproductos();
                res.render('partials/abmproductos', { productos: producto });
            }
        });
    }
    //CRUD	
    agregarProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto = req.body;
            if (!req.session.auth) {
                req.flash('error', 'Debes iniciar sesion para ver esta seccion!');
                res.redirect("../user/signin");
            }
            else {
                if (req.session.user.rol !== "admin") {
                    req.flash('error', 'Debes tener perfil de Admin para ver esta seccion!');
                    res.redirect("../user/home");
                }
                var texto_limpio = producto.nombre.replace(/^\s+|\s+$/g, "");
                if (texto_limpio === "") {
                    req.flash('error', 'El Nombre no puede estar vacío!');
                    return res.redirect("./abmproductos");
                }
                const busqueda = yield adminModel_1.default.buscarProducto(producto.nombre);
                if (!busqueda) {
                    const result = yield adminModel_1.default.crear(producto);
                    if (!result)
                        req.flash('error', 'No se pudo crear el producto!');
                    req.flash('confirmacion', 'Producto agregado correctamente!');
                    return res.redirect("./abmproductos");
                }
                req.flash('error', 'El Producto ya se encuentra registrado!');
                return res.redirect("./abmproductos");
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                req.flash('error', 'Debes iniciar sesion para ver esta seccion!');
                res.redirect("../user/signin");
            }
            else {
                if (req.session.user.rol !== "admin") {
                    req.flash('error', 'Debes tener perfil de Admin para ver esta seccion!');
                    res.redirect("../user/home");
                }
                var texto_limpio = req.body.nombre.replace(/^\s+|\s+$/g, "");
                if (texto_limpio === "") {
                    req.flash('error', 'El Nombre no puede estar vacío!');
                    return res.redirect("./abmproductos");
                }
                const id = req.body.id;
                delete req.body.id;
                const result = yield adminModel_1.default.actualizar(req.body, id);
                if (result)
                    req.flash('confirmacion', 'El producto fue actualizado correctamente!');
                else
                    req.flash('error', 'El producto no se pudo actualizar!');
                return res.redirect("./abmproductos");
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                req.flash('error', 'Debes iniciar sesion para ver esta seccion!');
                res.redirect("../user/signin");
            }
            else {
                if (req.session.user.rol !== "admin") {
                    req.flash('error', 'Debes tener perfil de Admin para ver esta seccion!');
                    res.redirect("../user/home");
                }
                const { id } = req.params;
                const result = yield adminModel_1.default.eliminar(id);
                req.flash('confirmacion', 'Se eliminó el producto correctamente!');
                res.redirect('../abmproductos');
            }
        });
    }
}
const articuloController = new ArticuloController();
exports.default = articuloController;
//# sourceMappingURL=adminController.js.map