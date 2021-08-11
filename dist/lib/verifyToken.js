"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenValidation = (req, res, next) => {
    var _a;
    //Recuperamos la cabecera y la dividimos en 2    
    let token = ((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split('Baerer ', 2));
    //tomamos la parte que nos interesa, el token, para despues evaluar.
    token = token['1'];
    console.log("Evaluando token recibido");
    try {
        //const token = authHeader.split(' ')[1];
        const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'secretKey');
        console.log(payload);
        //req.session.user_id = payload._rol;
        //req.userdId = payload._id;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Token invalido!' });
    }
    /*if(!token)
        return res.status(401).json("Acceso denegado :P");
    next();*/
};
exports.TokenValidation = TokenValidation;
//# sourceMappingURL=verifyToken.js.map