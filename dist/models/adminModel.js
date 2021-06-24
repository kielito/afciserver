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
class AdminModel {
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
                connectionLimit: 10
                */
            });
        });
    }
    listarpedidos() {
        return __awaiter(this, void 0, void 0, function* () {
            const articulo = yield this.db.query('SELECT * FROM pedidos');
            return articulo[0];
        });
    }
    listarproductos() {
        return __awaiter(this, void 0, void 0, function* () {
            const articulo = yield this.db.query('SELECT * FROM variedades');
            return articulo[0];
        });
    }
    buscarProducto(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM variedades WHERE nombre = ?', [nombre]);
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    //CRUD
    crear(variedad) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO variedades SET ?', [variedad]))[0].affectedRows;
            return result;
        });
    }
    actualizar(variedad, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE variedades SET ? WHERE id = ?', [variedad, id]))[0].affectedRows;
            return result;
        });
    }
    eliminar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('DELETE FROM variedades WHERE id = ?', [id]))[0].affectedRows;
            return result;
        });
    }
}
const adminModel = new AdminModel();
exports.default = adminModel;
//# sourceMappingURL=adminModel.js.map