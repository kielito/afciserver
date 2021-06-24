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
const articuloModel_1 = __importDefault(require("../models/articuloModel"));
class ArticuloController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const articulos = yield articuloModel_1.default.listar();
            const proveedores = yield articuloModel_1.default.listarProveedor();
            return res.json({ articulo: articulos, proveedor: proveedores });
        });
    }
    //CRUD
    agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const articulo = req.body;
            const id = articulo.Id;
            delete articulo.Id;
            const IdProveedor = yield articuloModel_1.default.buscarProveedor(articulo.RazonSocial);
            const busqueda = yield articuloModel_1.default.buscarId(id);
            if (articulo.CodigoProducto === "" || articulo.Descripcion === "" || articulo.RazonSocial === "" || articulo.PrecioVenta === "") {
                return res.status(400).json({ message: "Debe completar todos los datos!" });
            }
            else {
                const busqueda = yield articuloModel_1.default.buscarCodigoArticulo(articulo.CodigoProducto);
                if (!busqueda) {
                    articulo.IdProveedor = IdProveedor.Id;
                    delete articulo.RazonSocial;
                    console.log(articulo);
                    const resultado = yield articuloModel_1.default.crear(articulo);
                    if (!resultado)
                        return res.status(400).json({ message: "No se pudo crear el proveedor!" });
                    else {
                        return res.status(200).json({ message: "Articulo Registrado correctamente!" });
                    }
                }
                return res.status(500).json({ message: "El Articulo ya se encuentra registrado!" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const articulo = req.body;
            const id = articulo.Id;
            delete articulo.Id;
            const IdProveedor = yield articuloModel_1.default.buscarProveedor(articulo.RazonSocial);
            const busqueda = yield articuloModel_1.default.buscarId(id);
            if (busqueda && IdProveedor) {
                if (articulo.CodigoProducto === "" || articulo.Descripcion === "" || articulo.RazonSocial === "" || articulo.PrecioVenta === "") {
                    return res.status(400).json({ message: "Debe completar todos los datos!" });
                }
                else {
                    articulo.IdProveedor = IdProveedor.Id;
                    delete articulo.RazonSocial;
                    const result = yield articuloModel_1.default.actualizar(articulo, id);
                    if (result) {
                        return res.status(200).json({ message: "Articulo actualizado correctamente" });
                    }
                    return res.status(400).json({ message: "Error al actualizar los datos!" });
                }
            }
            return res.status(400).json({ message: "El Articulo no se encuentra registrado" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield articuloModel_1.default.eliminar(id);
            return res.status(200).json({ message: "Se eliminó el Artículo correctamente!" });
        });
    }
}
const articuloController = new ArticuloController();
exports.default = articuloController;
//# sourceMappingURL=articuloController.js.map