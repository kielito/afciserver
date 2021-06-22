import { Response } from "express";
import nodemailer from "nodemailer";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const EnvioEmail = (Email:string, Id:number) => {	
    try {
        var transporter = nodemailer.createTransport({
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
			} else {
			  console.log('Email sent: ' + info);
			}
		  });
	  
		  console.log("End of Script");

    } catch(error) {
        //return res.status(401).json({message: 'Error al enviar Email!'});
    }
}