"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const express_validator_1 = require("express-validator");
const schema = [
    express_validator_1.body('usuario')
        .isLength({ min: 3, max: 20 })
        .withMessage('Debe contener minimo 3 caracteres y maximo 20!')
        .matches(/^[a-z]$/)
        .withMessage('Debe ser alfabético'),
    express_validator_1.body('nombre')
        .isLength({ min: 3, max: 20 })
        .withMessage('Debe contener minimo 3 caracteres y maximo 20!')
        .matches(/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/)
        .withMessage('Debe ser alfabético'),
    express_validator_1.body('apellido')
        .isLength({ min: 3, max: 20 })
        .withMessage('Debe contener minimo 3 caracteres y maximo 20!')
        .matches(/^[A-Za-z/g]+$/g)
        .withMessage('Debe ser alfabético'),
    express_validator_1.body('password')
        .isLength({ min: 6, max: 20 })
        .withMessage('Debe contener minimo 6 caracteres y maximo 20!')
        .matches(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{6,20}$/)
        .withMessage('Debe ser alfanumerica, admite mayusculas y un mínimo de 6 caracteres, no permite caracteres especiales'),
    express_validator_1.body('repassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Los password deben ser iguales'),
    express_validator_1.body('email')
        .isEmail()
        .withMessage('No es un Email válido!')
        .isLength({ min: 3, max: 30 })
        .withMessage('Debe ser mayor a 3 y menos a 30 caracteres!'),
    express_validator_1.oneOf([
        express_validator_1.body('perfil').equals('Usuario'),
        express_validator_1.body('perfil').equals('Admin'),
    ], 'Perfil no existe'),
];
exports.registerSchema = schema;
//# sourceMappingURL=register-schema.js.map