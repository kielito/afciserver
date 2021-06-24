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
class ProveedorModel {
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
            const proveedores = yield this.db.query('SELECT * FROM proveedor');
            return proveedores[0];
        });
    }
    buscarProveedor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM proveedor WHERE Id = ?', [id]);
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    buscarNumeroDocumento(numeroDocumento) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM proveedor WHERE NumeroDocumento = ?', [numeroDocumento]);
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    crearProveedor(proveedor) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.query('INSERT INTO proveedor SET ?', [proveedor]);
            return result;
        });
    }
    actualizarProveedor(proveedor, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE proveedor SET ? WHERE Id = ?', [proveedor, id]))[0].affectedRows;
            return result;
        });
    }
    eliminarProveedor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('DELETE FROM proveedor WHERE Id = ?', [id]))[0].affectedRows;
            return result;
        });
    }
}
const proveedorModel = new ProveedorModel();
exports.default = proveedorModel;
//# sourceMappingURL=proveedorModel.js.map