"use strict";
/*******************************************************************************
*		DNI:33.111.151
*		APELLIDO/S: GOMEZ
*		NOMBRE/S: LEANDRO
*		PARCIAL: 2
*		FECHA: 17/06/2021
*******************************************************************************/
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
const compraModel_1 = __importDefault(require("../models/compraModel"));
class CompraController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const compras = yield compraModel_1.default.listar();
            return res.json(compras);
        });
    }
    crearcompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var articulos = req.body;
            console.log(articulos);
            var compra_articulo = [];
            let id = "";
            let total = 0;
            for (let i = 0; i < articulos.length; i++) {
                if (articulos[i].id) {
                    const precio = yield compraModel_1.default.listarPrecio(articulos[i].id.toString());
                    total = total + (precio.precio * articulos[i].cantidad);
                }
            }
            for (let i = 0; i < articulos.length; i++) {
                if (articulos[i].calle != undefined) {
                    var compra = { "calle": articulos[i].calle,
                        "altura": articulos[i].altura,
                        "total": total
                    };
                    const result = yield compraModel_1.default.crearCompra(compra);
                    id = result.toString();
                }
            }
            for (let i = 0; i < articulos.length; i++) {
                if (articulos[i].id) {
                    const precio = yield compraModel_1.default.listarPrecio(articulos[i].id.toString());
                    compra_articulo.push({
                        "id_pedido": id,
                        "id_articulo": articulos[i].id.toString(),
                        "precio": precio.precio.toString(),
                        "cantidad": articulos[i].cantidad
                    });
                    yield compraModel_1.default.crearCompraArticulo(compra_articulo[i]);
                }
            }
            return res.status(200).json({ message: "Pedido cargado correctamente!" });
        });
    }
    crearcarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*var articulos = req.body;
            var compra_articulo=[];
            console.log(id);
            
            for (let i=0;i<articulos.length;i++) {
                compra_articulo.push({
                    "id_pedido": id,
                    "id_articulo": articulos[i].id.toString(),
                    "precio": articulos[i].precio.toString(),
                    "cantidad": articulos[i].cantidad
                });
                await compraModel.crearCompraArticulo(compra_articulo[i])
            }
           
            return res.status(200).json({ message:"Compra Registrada "});*/
        });
    }
}
const compraController = new CompraController();
exports.default = compraController;
//# sourceMappingURL=compraController.js.map