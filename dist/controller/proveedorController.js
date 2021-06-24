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
const proveedorModel_1 = __importDefault(require("../models/proveedorModel"));
class ProveedorController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const proveedores = yield proveedorModel_1.default.listar();
            return res.json(proveedores);
        });
    }
    //CRUD
    agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const proveedor = req.body;
            if (proveedor.TipoDocumento === "" || proveedor.NumeroDocumento === "" || proveedor.RazonSocial === "" || proveedor.Email === "" || proveedor.Direccion === "" || proveedor.Localidad === "" || proveedor.Provincia === "" || proveedor.CodigoPostal === "") {
                return res.status(400).json({ message: "Debe completar todos los datos!" });
            }
            else {
                const busqueda = yield proveedorModel_1.default.buscarNumeroDocumento(proveedor.NumeroDocumento);
                if (!busqueda) {
                    const resultado = yield proveedorModel_1.default.crearProveedor(proveedor);
                    if (!resultado)
                        return res.status(400).json({ message: "No se pudo crear el proveedor!" });
                    else {
                        return res.status(200).json({ message: "Proveedor Registrado correctamente!" });
                    }
                }
                return res.status(500).json({ message: "El Proveedor ya se encuentra registrado!" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const proveedor = req.body;
            const id = proveedor.Id;
            delete proveedor.Id;
            const busqueda = yield proveedorModel_1.default.buscarProveedor(id);
            if (busqueda) {
                if (proveedor.TipoDocumento === "" || proveedor.NumeroDocumento === "" || proveedor.RazonSocial === "" || proveedor.Email === "" || proveedor.Direccion === "" || proveedor.Localidad === "" || proveedor.Provincia === "" || proveedor.CodigoPostal === "") {
                    return res.status(400).json({ message: "Debe completar todos los datos!" });
                }
                else {
                    const result = yield proveedorModel_1.default.actualizarProveedor(proveedor, id);
                    if (result) {
                        return res.status(200).json({ message: "Proveedor actualizado correctamente" });
                    }
                    return res.status(400).json({ message: "Error al actualizar los datos!" });
                }
            }
            return res.status(400).json({ message: "El Proveedor no se encuentra registrado" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield proveedorModel_1.default.eliminarProveedor(id);
            return res.status(200).json({ message: "Se eliminó el Proveedor correctamente!" });
        });
    }
}
const proveedorController = new ProveedorController();
exports.default = proveedorController;
//# sourceMappingURL=proveedorController.js.map