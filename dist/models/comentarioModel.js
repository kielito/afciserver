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
class ComentarioModel {
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
                /*
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'heroku_4505cc56058eb11',
                connectionLimit: 10,
                multipleStatements: false	*/
            });
        });
    }
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield this.db.query('SELECT * FROM comentario');
            //const productos = await this.db.query('SELECT p.CodigoProducto, p.Descripcion, pp.Id, pp.StockMinimo, pp.StockActual, p.PrecioVenta, pv.RazonSocial FROM producto p INNER JOIN producto_proveedor pp ON p.Id = pp.IdProducto INNER JOIN proveedor pv ON pp.IdProveedor = pv.Id');
            return usuarios[0];
        });
    }
    buscarId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM comentario WHERE Id = ?', [id]);
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    crear(comentario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.query('INSERT INTO comentario SET ?', [comentario]);
            return result;
        });
    }
    actualizar(comentario, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE comentario SET ? WHERE Id = ?', [comentario, id]))[0].affectedRows;
            return result;
        });
    }
    eliminar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('DELETE FROM comentario WHERE Id = ?', [id]))[0].affectedRows;
            return result;
        });
    }
    // Archivos
    crearArchivo(archivo) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO archivo SET ?', [archivo]))[0].insertId;
            return result;
        });
    }
    budcarArchivos() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.query('SELECT * FROM archivo');
            return result[0];
        });
    }
    budcarArchivo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('SELECT * FROM archivo WHERE Id = ?', [id]));
            return result[0][0];
            ;
        });
    }
    eliminarArchivo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('DELETE FROM archivo WHERE Id = ?', [id]))[0].affectedRows;
            return result;
        });
    }
}
const comentarioModel = new ComentarioModel();
exports.default = comentarioModel;
//# sourceMappingURL=comentarioModel.js.map