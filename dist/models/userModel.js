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
        this.encriptarPassword = (pwd_usuario) => __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            return yield bcryptjs_1.default.hash(pwd_usuario, salt);
        });
        //Compara la Clave ingresada vs la registrada
        this.validarPassword = function (pwd_usuario, passwordhash) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield bcryptjs_1.default.compare(pwd_usuario, passwordhash);
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
                database: 'c32prod_geoaf',
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
    buscarId(dni_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM usuario WHERE dni_usuario = ?', [dni_usuario]);
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    buscarNombre(nombre_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM usuario WHERE nombre_usuario = ?', [nombre_usuario]);
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    /*
    async buscarUsuario(usuario: string, email: string) {
        const encontrado: any = await this.db.query('SELECT * FROM usuario WHERE Usuario = ? AND Email = ?', [usuario,email]);
        if (encontrado.length > 1)
            return encontrado[0][0];
        return null;
    }
    */
    crear(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO usuario SET ?', [usuario]))[0].affectedRows;
            return result;
        });
    }
    actualizar(usuario, dni_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE usuario SET ? WHERE dni_usuario = ?', [usuario, dni_usuario]))[0].affectedRows;
            return result;
        });
    }
    eliminar(dni_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield this.db.query('DELETE FROM usuario WHERE dni_usuario = ?', [dni_usuario]))[0].affectedRows;
            return user;
        });
    }
}
const userModel = new UserModel();
exports.default = userModel;
//# sourceMappingURL=userModel.js.map