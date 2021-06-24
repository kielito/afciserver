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
class CompraModel {
    constructor() {
        this.config();
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield promise_1.createPool({
                /*
                host: 'us-cdbr-east-03.cleardb.com',
                user: 'b0e0fd43ed8818',
                password: '2b1f9d39',
                database: 'heroku_4505cc56058eb11',
                connectionLimit: 10,
                multipleStatements: false
                */
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'heroku_4505cc56058eb11',
                connectionLimit: 10,
                multipleStatements: false
            });
        });
    }
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            const compras = yield this.db.query('SELECT * FROM pedidos');
            return compras[0];
        });
    }
    listarPrecio(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const precio = yield this.db.query('SELECT precio FROM variedades where id = ?', [id]);
            if (precio.length > 1)
                return precio[0][0];
            return null;
        });
    }
    crearCompra(compra) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO pedidos SET ?', [compra]))[0].insertId;
            return result;
        });
    }
    crearCompraArticulo(compra) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO pedidos_articulos SET ?', [compra]))[0].affectArrow;
            return result;
        });
    }
}
const compraModel = new CompraModel();
exports.default = compraModel;
//# sourceMappingURL=compraModel.js.map