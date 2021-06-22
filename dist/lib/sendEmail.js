"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvioEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const EnvioEmail = (Email, Id) => {
    try {
        var transporter = nodemailer_1.default.createTransport({
            //service: "Gmail", //al usar un servicio bien conocido, no es necesario proveer un nombre de servidor.
            port: 587,
            host: 'smtp.gmail.com',
            secure: false,
            requireTLS: true,
            auth: {
                user: 'webpecera@gmail.com',
                pass: 'PeceraSA2021_'
            }
        });
        var mailOptions = {
            from: 'Web Pecera SA',
            to: Email,
            subject: 'Activar Usuario',
            html: `
			<strong>Link: </strong> <a href="http://localhost:4200/usuarios/activar/${Id}">Activar la cuenta</a> <br/>
			`
        };
        console.log("sending email", mailOptions);
        transporter.sendMail(mailOptions, function (error, info) {
            console.log("senMail returned!");
            if (error) {
                console.log("ERROR!!!!!!", error.message);
            }
            else {
                console.log('Email sent: ' + info);
            }
        });
        console.log("End of Script");
    }
    catch (error) {
        //return res.status(401).json({message: 'Error al enviar Email!'});
    }
};
exports.EnvioEmail = EnvioEmail;
//# sourceMappingURL=sendEmail.js.map