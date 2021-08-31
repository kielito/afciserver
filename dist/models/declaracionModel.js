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
class DeclaracionModel {
    constructor() {
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
    altaDecJurada(fecha_alta, sellos_pedidos, fecha_firma_ddjj, tipo_dec_jurada, pcia_ddjj, usuario_dni_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO dec_jurada (fecha_alta, sellos_pedidos, fecha_firma_ddjj, tipo_dec_jurada, pcia_ddjj, usuario_dni_usuario) VALUES (?, ?, ?, ?, ?, ?)', [fecha_alta, sellos_pedidos, fecha_firma_ddjj, tipo_dec_jurada, pcia_ddjj, usuario_dni_usuario]))[0].insertId;
            return result;
        });
    }
    altaSolicitante(dni_solicitante, dec_jurada_id_dec_jurada_ind, nombre_solicitante, apellido_solicitante, nacionalidad_solicitante, cuit_solicitante, renaf_solicitante, nacimiento_solicitante, direccion_solicitante, localidad_solicitante, provincia_solicitante, tel_solicitante, email_solicitante, latitud_solicitante, longitud_solicitante, codigo_postal_solicitante, tipo_dec_jurada) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO solicitante (dni_solicitante, dec_jurada_id_dec_jurada_ind, nombre_solicitante, apellido_solicitante, nacionalidad_solicitante, cuit_solicitante, renaf_solicitante, nacimiento_solicitante, direccion_solicitante, localidad_solicitante, provincia_solicitante, tel_solicitante, email_solicitante, latitud_solicitante, longitud_solicitante, codigo_postal_solicitante, tipo_dec_jurada) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [dni_solicitante, dec_jurada_id_dec_jurada_ind, nombre_solicitante, apellido_solicitante, nacionalidad_solicitante, cuit_solicitante, renaf_solicitante, nacimiento_solicitante, direccion_solicitante, localidad_solicitante, provincia_solicitante, tel_solicitante, email_solicitante, latitud_solicitante, longitud_solicitante, codigo_postal_solicitante, tipo_dec_jurada]))[0].affectedRows;
            return result;
        });
    }
    altaProduccion(dec_jurada_id_dec_jurada_ind, decide_produccion, decide_comercializacion, administra_recursos, tipo_vegetal, tipo_animal, describe_principal, tipo_dec_jurada) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO produccion (dec_jurada_id_dec_jurada_ind, decide_produccion, decide_comercializacion, administra_recursos, tipo_vegetal, tipo_animal, describe_principal, tipo_dec_jurada) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [dec_jurada_id_dec_jurada_ind, decide_produccion, decide_comercializacion, administra_recursos, tipo_vegetal, tipo_animal, describe_principal, tipo_dec_jurada]))[0].affectedRows;
            return result;
        });
    }
    altaPuntoVenta(dec_jurada_id_dec_jurada_ind, descripcion_pv, direccion_pv, localidad_pv, latitud_pv, longitud_pv, tipo_dec_jurada) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO puntos_venta (dec_jurada_id_dec_jurada_ind, descripcion_pv, direccion_pv, localidad_pv, latitud_pv, longitud_pv, tipo_dec_jurada) VALUES (?, ?, ?, ?, ?, ?, ?)', [dec_jurada_id_dec_jurada_ind, descripcion_pv, direccion_pv, localidad_pv, latitud_pv, longitud_pv, tipo_dec_jurada]))[0].affectedRows;
            return result;
        });
    }
}
const declaracionModel = new DeclaracionModel();
exports.default = declaracionModel;
//# sourceMappingURL=declaracionModel.js.map