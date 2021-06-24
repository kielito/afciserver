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
const express_1 = require("express");
const promise_1 = require("mysql2/promise");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            req.session.auth = false;
            req.session.user = {};
            res.render("partials/principal");
        });
        this.router.get('/test', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const db = yield promise_1.createPool({
                host: 'us-cdbr-east-03.cleardb.com',
                user: 'b0e0fd43ed8818',
                password: '2b1f9d39',
                database: 'heroku_4505cc56058eb11',
                connectionLimit: 10,
                multipleStatements: false
            });
            const result = (yield db.query("SELECT * FROM usuario"))[0];
            console.log(result);
            res.send("Test OK!!! Revisar filas en consola del servidor");
        }));
    }
}
//Exportamos el enrutador con 
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
//# sourceMappingURL=indexRoutes.js.map