"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestSchema = void 0;
const express_validator_1 = require("express-validator");
function validateRequestSchema(req, res, next) {
    const result = express_validator_1.validationResult(req);
    var mensajes = [];
    console.log(result);
    if (!result.isEmpty()) {
        for (let i = 0; i < result.array().length; i++) {
            mensajes.push(result.array()[i].param + ": " + result.array()[i].msg);
        }
        return res.status(500).json({ message: mensajes });
    }
    next();
}
exports.validateRequestSchema = validateRequestSchema;
//# sourceMappingURL=validation.js.map