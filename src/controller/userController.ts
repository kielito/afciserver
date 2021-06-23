import {Request, Response} from 'express';
import  userModel from '../models/userModel';
import jwt from "jsonwebtoken";
import { EnvioEmail } from "../lib/sendEmail";

class UserController{

	public signin(req:Request,res:Response){		
        res.render("partials/signinForm");
	}

    public async login(req:Request,res:Response){
		var { Usuario, Email, Password } = req.body;
		Usuario = Usuario.replace(/[='"]/g,'');
		Email = Email.replace(/[='"]/g,'');
		console.log(Usuario, Email);
        const result = await userModel.buscarUsuario(Usuario, Email);
        
        if (!result){ 
			return res.status(500).json({ message:"Usuario y/o Email incorrectos"});
		} else {
			const correctPassword = await userModel.validarPassword(Password, result.Password);
	
			if (correctPassword){
				req.session.user=result;
				req.session.auth=true;

				const sesion = req.session.user;
				const token:string=jwt.sign({_id: result.id, _rol: result.rol},"secretKey"); //Genera el Token del Usuario
				
				return res.status(200).json({ message:"Bienvenido "+result.nombre, sesion,token:token });
				
			} else {	
				return res.status(500).json({ message:"Usuario y/o Clave incorrectos"});
			}			
		}			
	}

    //REGISTRO
	public signup(req:Request,res:Response){		
		//res.render("partials/signupForm");
	}

	public async activar(req:Request,res:Response){
		const id = req.params.id;
		const result = await userModel.habilitar(id);
		
		if(result) {	
			return res.status(200).json("Usuario habilitado correctamente");
		} else {
			return res.status(400).json({ message:"El usuario no se encuentra registrado"});
		}
	}

	//HOME
    public async home(req:Request,res:Response){	
		/*res.render("partials/home");
		return;
		/*if(!req.session.auth){
            req.flash('error','Debes iniciar sesion para ver esta seccion!');
			res.redirect("./signin");
        }		
		res.render("partials/home");*/
	}
	

	//CRUD
	public async list(req:Request,res:Response){		
        const usuarios = await userModel.listar();   
        return res.json(usuarios);
	}

	public async find(req:Request,res:Response){		
        const { id } = req.params;
        const usuario = await userModel.buscarId(id);
        if (usuario)
            return res.json(usuario);
        
		//req.flash('error','User doesnt exists!');
	}

	public async addUser(req:Request,res:Response){
		const usuario = req.body;
		
		if(usuario.nombre.length < 2){
			return res.status(500).json({ message:"El Usuario no cumple con las reglas!"}); //Dos parametros: primero variable, segundo el valor que tendra esa variable
			//return res.redirect("./signup");
		}		
		if(usuario.password.length < 5){
			return res.status(500).json({ message:"La clave no cumple con las reglas!"}); //Dos parametros: primero variable, segundo el valor que tendra esa variable
			//return res.redirect("./signup");
		}

		if(usuario.password !== usuario.repassword){
			return res.status(500).json({ message:"Las claves deben ser iguales!"}); //Dos parametros: primero variable, segundo el valor que tendra esa variable
			//return res.redirect("./signup");
		}
		delete usuario.repassword;

        const busqueda = await userModel.buscarUsuario(usuario.nombre, usuario.email);		
		usuario.password = await userModel.encriptarPassword(usuario.password);

        if (!busqueda) {
            const result = await userModel.crear(usuario);
			
			/*if (!result) 
				req.flash('error','No se pudo crear el usuario!');

			req.flash('confirmacion','Usuario Registrado correctamente!');*/
			if (!result) 
				return res.status(400).json({ message:"No se pudo crear el usuario "});
			else{
				EnvioEmail(usuario.email, result);
				return res.status(200).json({ message:"Usuario Registrado "});
			}
            //return res.redirect("./signin");
        }
		return res.status(500).json({ message:"El usuario y/o email ya se encuentra registrado!"});			
	}

	public async update(req:Request,res:Response){
		/*if(!req.session.auth){
            req.flash('error','Debe iniciar sesion para ver esta seccion'); //Dos parametros: primero variable, segundo el valor que tendra esa variable
			res.redirect("../signin");
        }*/
		
        const { id } = req.params;		
		const usuario = await userModel.buscarId(id);

		if(req.body.password === ""){
			//req.flash('error','La clave no puede estar vacía!');
			//return res.render("partials/update",{usuario, home:req.session.user, mi_session:true});
			return res.status(400).json({ message:"La clave no puede estar vacía"});
		}
		if(req.body.rol === ""){
			//req.flash('error','Debe seleccionar un Nuevo Rol!');
			//return res.render("partials/update",{usuario, home:req.session.user, mi_session:true});
			return res.status(400).json({ message:"Debe seleccionar un Nuevo Rol"});
		}		
		else{

		req.body.password = await userModel.encriptarPassword(req.body.password);
        const result = await userModel.actualizar(req.body, id);
        
		if(result) {			
		/*req.flash('confirmacion','Usuario "' + req.body.nombre + '" actualizado correctamente!');			
        return res.redirect("../control");*/
		return res.status(200).json({ message:"Usuario actualizado correctamente"});
		}
		
		//req.flash('error','El usuario y/o email ya se encuentra registrado!'); //Dos parametros: primero variable, segundo el valor que tendra esa variable
		//return res.render("partials/update",{usuario, home:req.session.user, mi_session:true});
		return res.status(400).json({ message:"El usuario y/o email ya se encuentra registrado"});
		}
	}

	public async delete(req:Request,res:Response){        
		const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await userModel.eliminar(id);				
		return res.status(200).json({ message:"Se eliminó el Usuario correctamente!"});
	}

	//FIN CRUD


	public async control(req:Request,res:Response){		
        /*if(!req.session.auth){
            req.flash('error','Debe iniciar sesion para ver esta seccion'); //Dos parametros: primero variable, segundo el valor que tendra esa variable
			res.redirect("./signin");
        }
        const usuarios = await userModel.listar();       
        res.render('partials/controls', { users: usuarios, mi_session:true });	*/
	}	

	public async procesar(req:Request,res:Response){
        /*if(!req.session.auth){            
			req.flash('error','Debes iniciar sesion para ver esta seccion');
			return res.redirect("../signin");
        }

		const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const usuario = await userModel.buscarId(id);

        if(usuario !== undefined){            
			res.render("partials/update",{usuario, home:req.session.user, mi_session:true});
        }*/
	}


	//METODO PARA CERRAR LA SESION
	public endSession(req: Request, res: Response){        
        req.session.user={}; //Se borran los datos del usuarios guardados en la variable user
        req.session.auth=false; //Se pone autenticado en false
        req.session.destroy(()=>console.log("Sesion finalizada")); //Metodo para destruir datos asociados a la sesion
        res.redirect("/");
    }

	/*public EnvioEmail(){        
        
		var transporter = nodemailer.createTransport({
			service: "Gmail", //al usar un servicio bien conocido, no es necesario proveer un nombre de servidor.
			auth: {
			  user: 'webpecera@gmail.com',
			  pass: 'PeceraSA2021_'
			}
		  });
		  var mailOptions = {
			from: 'webpecera@gmail.com',
			to: 'damian_gomez_87@hotmail.com',
			subject: 'Sending Email using Node.js',
			text: 'That was easy!'
		  };
	  
		  console.log("sending email", mailOptions);
		  transporter.sendMail(mailOptions, function (error, info) {
			console.log("senMail returned!");
			if (error) {
			  console.log("ERROR!!!!!!", error);
			} else {
			  console.log('Email sent: ' + info);
			}
		  });
	  
		  console.log("End of Script");

	}*/


}

const userController = new UserController(); 
export default userController;