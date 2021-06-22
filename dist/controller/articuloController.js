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
            return res.json(articulos);
        });
    }
    //CRUD
    agregarProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const articulo = req.body;
            let idProducto;
            var texto_limpio = articulo.nombre.replace(/^\s+|\s+$/g, "");
            if (texto_limpio === "") {
                return res.status(500).json({ message: "El Nombre no puede estar vacío! " });
            }
            const busqueda = yield articuloModel_1.default.buscarCodigoProducto(articulo.CodigoProducto);
            if (!busqueda) {
                idProducto = yield articuloModel_1.default.crear(articulo.CodigoProducto, articulo.Descripcion);
            }
            else {
                const resultBuscarProdProv = yield articuloModel_1.default.buscarProductoProveedor(busqueda.Id, articulo.IdProveedor);
                if (resultBuscarProdProv)
                    return res.status(500).json({ message: "El Producto ya se encuentra registrado para este proveedor!" });
            }
            const result = yield articuloModel_1.default.crearProductoProveedor(idProducto, articulo.IdProveedor, articulo.StockMinimo, articulo.StockActual, articulo.PrecioVenta);
            if (!result)
                return res.status(500).json({ message: "No se pudo crear el producto! " });
            return res.status(200).json({ message: "Producto agregado correctamente! " });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var texto_limpio = req.body.nombre.replace(/^\s+|\s+$/g, "");
            if (texto_limpio === "") {
                return res.status(500).json({ message: "El Nombre no puede estar vacío! " });
            }
            const id = req.body.id;
            delete req.body.id;
            const result = yield articuloModel_1.default.actualizar(req.body, id);
            if (result)
                return res.status(200).json({ message: "El producto fue actualizado correctamente! " });
            else
                return res.status(500).json({ message: "El producto no se pudo actualizar!" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const articulo = req.body;
            console.log(req.body);
            yield articuloModel_1.default.eliminarProductoProveedor(articulo.id);
            //await articuloModel.eliminar(articulo.id);
            return res.status(200).json({ message: "Se eliminó el producto correctamente!" });
        });
    }
}
const articuloController = new ArticuloController();
exports.default = articuloController;
//# sourceMappingURL=articuloController.js.map