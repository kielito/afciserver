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
class PedidoModel {
    constructor() {
        this.config(); //aplicamos la conexion con la BD.
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield promise_1.createPool({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'estacionamiento',
                connectionLimit: 10 //es una idea de conexiones, el limete dependera de la carga que tenga el servidor
            });
        });
    }
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            const autos = yield this.db.query('SELECT * FROM auto');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return autos[0];
        });
    }
    //Devuelve un objeto cuya fila en la tabla usuarios coincide con id.
    //Si no la encuentra devuelve null
    buscarId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM auto WHERE id_auto = ?', [id]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    /*
    //Devuelve un objeto cuya fila en la tabla usuarios coincide con nombre.
    //Si no la encuentra devuelve null
    async buscarNombre(nombre: string) {
        const encontrado: any = await this.db.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);
        //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
        if (encontrado.length > 1)
            return encontrado[0][0];
        return null;
    }

    async buscarUsuario(nombre: string, email: string) {
        const encontrado: any = await this.db.query('SELECT * FROM usuarios WHERE nombre = ? OR email = ?', [nombre,email]);
        //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
        if (encontrado.length > 1)
            return encontrado[0][0];
        return null;
    }

    //Devuelve 1 si logro crear un nuevo usuario de la tabla usuarios
    async crear(usuario: object) {
        //ry {
        const result = (await this.db.query('INSERT INTO usuarios SET ?', [usuario]))[0].affectedRows;
        
        return result;
        /*} catch (error)	{
            console.log(error);
        }*/ /*
}*/
    //Devuelve 1 si logro actualizar el usuario indicado por id
    actualizar(auto, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE auto SET ? WHERE id_auto = ?', [auto, id]))[0].affectedRows;
            return result;
        });
    }
    //Devuelve 1 si logro eliminar el usuario indicado por id
    eliminar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const auto = (yield this.db.query('DELETE FROM auto WHERE id_auto = ?', [id]))[0].affectedRows;
            return auto;
        });
    }
}
//Exportamos el enrutador con 
const pedidoModel = new PedidoModel();
exports.default = pedidoModel;
//# sourceMappingURL=pedidoModel.js.map