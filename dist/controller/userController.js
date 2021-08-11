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
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    signin(req, res) {
        res.render("partials/signinForm");
    }
    signup(req, res) {
        //res.render("partials/signupForm");
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var { dni_usuario, pwd_usuario } = req.body;
            console.log(dni_usuario);
            const result = yield userModel_1.default.buscarId(dni_usuario);
            if (!result) {
                return res.status(500).json({ message: "Dni incorrecto" });
            }
            else {
                const correctPassword = yield userModel_1.default.validarPassword(pwd_usuario, result.pwd_usuario);
                if (correctPassword) {
                    req.session.user = result;
                    req.session.auth = true;
                    const sesion = req.session.user;
                    const token = jsonwebtoken_1.default.sign({ _dni_usuario: result.dni_usuario, _perfil_usuario: result.perfil_usuario }, "secretKey", {
                        expiresIn: '1d'
                    }); //Genera el Token del Usuario
                    return res.status(200).json({ message: "Bienvenido " + result.nombre_usuario, sesion, token: token });
                }
                else {
                    return res.status(500).json({ message: "Usuario y/o Clave incorrectos" });
                }
            }
        });
    }
    //CRUD
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield userModel_1.default.listar();
            return res.json(usuarios);
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield userModel_1.default.buscarId(id);
            if (usuario)
                return res.json(usuario);
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            if (usuario.dni_usuario.length < 6) {
                return res.status(500).json({ message: "El Dni no cumple con las reglas!" }); //Dos parametros: primero variable, segundo el valor que tendra esa variable
            }
            if (usuario.pwd_usuario.length < 5) {
                return res.status(500).json({ message: "La clave no cumple con las reglas!" }); //Dos parametros: primero variable, segundo el valor que tendra esa variable
            }
            if (usuario.pwd_usuario !== usuario.repassword) {
                return res.status(500).json({ message: "Las claves deben ser iguales!" }); //Dos parametros: primero variable, segundo el valor que tendra esa variable
            }
            delete usuario.repassword;
            const busqueda = yield userModel_1.default.buscarId(usuario.dni_usuario);
            usuario.pwd_usuario = yield userModel_1.default.encriptarPassword(usuario.pwd_usuario);
            if (!busqueda) {
                const result = yield userModel_1.default.crear(usuario);
                if (!result)
                    return res.status(400).json({ message: "No se pudo crear el usuario " });
                else {
                    return res.status(200).json({ message: "Usuario Registrado " });
                }
            }
            return res.status(500).json({ message: "El usuario y/o email ya se encuentra registrado!" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield userModel_1.default.buscarId(id);
            console.log(result);
            if (result) {
                const usuario = req.body;
                if (usuario.NPass) {
                    if (usuario.NPass.replace(' ', '') === '') {
                        delete usuario.NPass;
                        delete usuario.Password;
                    }
                    else {
                        usuario.pwd_usuario = yield userModel_1.default.encriptarPassword(usuario.NPass);
                        delete usuario.NPass;
                    }
                }
                else {
                    delete usuario.pwd_usuario;
                }
                if (usuario.dni_usuario === "" || usuario.nombre_usuario === "" || usuario.apellido_usuario === "" || usuario.organismo === "" || usuario.pcia_usuario === "" || usuario.perfil_usuario === "") {
                    return res.status(400).json({ message: "Debe completar todos los datos!" });
                }
                else {
                    const result = yield userModel_1.default.actualizar(usuario, id);
                    if (result) {
                        return res.status(200).json({ message: "Usuario actualizado correctamente" });
                    }
                    return res.status(400).json({ message: "Error al actualizar los datos!" });
                }
            }
            return res.status(400).json({ message: "El usuario no se encuentra registrado" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            console.log(id);
            const result = yield userModel_1.default.eliminar(id);
            return res.status(200).json({ message: "Se eliminó el usuario correctamente!" });
        });
    }
    //FIN CRUD
    //METODO PARA CERRAR LA SESION
    endSession(req, res) {
        req.session.user = {}; //Se borran los datos del usuarios guardados en la variable user
        req.session.auth = false; //Se pone autenticado en false
        req.session.destroy(() => console.log("Sesion finalizada")); //Metodo para destruir datos asociados a la sesion
        res.redirect("/");
    }
}
const userController = new UserController();
exports.default = userController;
//# sourceMappingURL=userController.js.map