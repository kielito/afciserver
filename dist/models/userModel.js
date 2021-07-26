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
const promise_1 = require("mysql2/promise");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserModel {
    constructor() {
        //Encriptar Clave
        this.encriptarPassword = (password) => __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            return yield bcryptjs_1.default.hash(password, salt);
        });
        //Compara la Clave ingresada vs la registrada
        this.validarPassword = function (password, passwordhash) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield bcryptjs_1.default.compare(password, passwordhash);
            });
        };
        this.config();
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield promise_1.createPool({
                host: 'us-cdbr-east-04.cleardb.com',
                user: 'b603cf410ef897',
                password: 'd43c3a4c',
                database: 'heroku_8d9dee01461c848',
                connectionLimit: 10,
                multipleStatements: false
                /*
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'afci',
                connectionLimit: 10,
                multipleStatements: false
                */
            });
        });
    }
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield this.db.query('SELECT * FROM usuario');
            return usuarios[0];
        });
    }
    buscarId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM usuario WHERE Id = ?', [id]);
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    buscarNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM usuario WHERE Nombre = ?', [nombre]);
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    buscarUsuario(usuario, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM usuario WHERE Usuario = ? AND Email = ?', [usuario, email]);
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    crear(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO usuario SET ?', [usuario]))[0].insertId;
            return result;
        });
    }
    actualizar(usuario, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE usuario SET ? WHERE Id = ?', [usuario, id]))[0].affectedRows;
            return result;
        });
    }
    eliminar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield this.db.query('DELETE FROM usuario WHERE Id = ?', [id]))[0].affectedRows;
            console.log(user);
            return user;
        });
    }
}
const userModel = new UserModel();
exports.default = userModel;
//# sourceMappingURL=userModel.js.map