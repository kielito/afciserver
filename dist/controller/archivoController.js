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
exports.eliminarArchivo = exports.crearArchivo = exports.buscarArchivo = exports.buscarArchivos = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function buscarArchivos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const archivos = yield userModel_1.default.budcarArchivos();
        return res.json(archivos);
    });
}
exports.buscarArchivos = buscarArchivos;
function buscarArchivo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const archivo = yield userModel_1.default.budcarArchivo(id);
        return res.json(archivo);
    });
}
exports.buscarArchivo = buscarArchivo;
function crearArchivo(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        //const {titulo, descripcion } = req.body;
        console.log('llega');
        console.log(req.file);
        const nuevoArchivo = {
            NombreOriginal: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname,
            NuevoNombre: (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename,
            Path: (_c = req.file) === null || _c === void 0 ? void 0 : _c.path
        };
        yield userModel_1.default.crearArchivo(nuevoArchivo);
        return res.json({
            message: 'Archivo Cargado correctamente'
        });
    });
}
exports.crearArchivo = crearArchivo;
function eliminarArchivo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const archivo = yield userModel_1.default.budcarArchivo(id);
        yield userModel_1.default.eliminarArchivo(id);
        if (archivo) {
            fs_extra_1.default.unlink(path_1.default.resolve(archivo.Path));
            return res.json({ message: 'Archivo borrado', archivo });
        }
        else
            return res.json({ message: 'No se encontró el Archivo' });
    });
}
exports.eliminarArchivo = eliminarArchivo;
//# sourceMappingURL=archivoController.js.map