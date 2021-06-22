"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearArchivo = exports.leerArchivo = void 0;
function leerArchivo(req, res) {
}
exports.leerArchivo = leerArchivo;
function crearArchivo(req, res) {
    console.log();
    console.log(req.body);
    return res.json({
        message: 'Archivo Cargado correctamente'
    });
}
exports.crearArchivo = crearArchivo;
//# sourceMappingURL=archivoController.js.map