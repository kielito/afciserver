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
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
class ArticuloModel {
    constructor() {
        this.config();
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield promise_1.createPool({
                host: 'us-cdbr-east-03.cleardb.com',
                user: 'b0e0fd43ed8818',
                password: '2b1f9d39',
                database: 'heroku_4505cc56058eb11',
                connectionLimit: 10,
                multipleStatements: false
            });
        });
    }
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            const productos = yield this.db.query('SELECT p.Id, p.CodigoProducto, p.Descripcion, pp.RazonSocial, p.StockActual, p.PrecioVenta FROM articulo_proveedor p INNER JOIN proveedor pp ON p.IdProveedor = pp.Id');
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return productos[0];
        });
    }
    listarProveedor() {
        return __awaiter(this, void 0, void 0, function* () {
            const productos = yield this.db.query('SELECT Id As IdProveedor, RazonSocial FROM proveedor');
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return productos[0];
        });
    }
    buscarId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM articulo_proveedor WHERE Id = ?', [id]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    buscarProveedor(razonSocial) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT Id FROM proveedor WHERE RazonSocial = ?', [razonSocial]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    buscarCodigoArticulo(codigoProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM producto WHERE CodigoProducto = ?', [codigoProducto]);
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    //CRUD
    crear(articulo) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.query('INSERT INTO articulo_proveedor SET ?', [articulo]);
            return result;
        });
    }
    actualizar(articulo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE articulo_proveedor SET ? WHERE Id = ?', [articulo, id]))[0].affectedRows;
            return result;
        });
    }
    eliminar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = (yield this.db.query('DELETE FROM articulo_proveedor WHERE Id = ?', [id]))[0].affectedRows;
            return product;
        });
    }
}
const articuloModel = new ArticuloModel();
exports.default = articuloModel;
//# sourceMappingURL=articuloModel.js.map