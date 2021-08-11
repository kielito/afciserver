import {Request, Response} from 'express';
import  userModel from '../models/userModel';
import jwt from "jsonwebtoken";

class UserController{
	public signin(req:Request,res:Response){		
        res.render("partials/signinForm");
	}	

	public signup(req:Request,res:Response){		
		//res.render("partials/signupForm");
	}

    public async login(req:Request,res:Response){
		var { dni_usuario, pwd_usuario } = req.body;
		console.log(dni_usuario);
        const result = await userModel.buscarId(dni_usuario);
        
        if (!result){ 
			return res.status(500).json({ message:"Dni incorrecto"});
		} else {
			const correctPassword = await userModel.validarPassword(pwd_usuario, result.pwd_usuario);
	
			if (correctPassword){
				req.session.user=result;
				req.session.auth=true;

				const sesion = req.session.user;
				const token:string=jwt.sign({_dni_usuario: result.dni_usuario, _perfil_usuario: result.perfil_usuario},"secretKey", {
					expiresIn: '1d'
				}); //Genera el Token del Usuario
				
				return res.status(200).json({ message:"Bienvenido "+result.nombre_usuario, sesion,token:token });
				
			} else {	
				return res.status(500).json({ message:"Usuario y/o Clave incorrectos"});
			}			
		}			
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
	}

	public async addUser(req:Request,res:Response){
		const usuario = req.body;
		if(usuario.dni_usuario.length < 6){
			return res.status(500).json({ message:"El Dni no cumple con las reglas!"}); //Dos parametros: primero variable, segundo el valor que tendra esa variable
		}	

		if(usuario.pwd_usuario.length < 5){
			return res.status(500).json({ message:"La clave no cumple con las reglas!"}); //Dos parametros: primero variable, segundo el valor que tendra esa variable
		}

		if(usuario.pwd_usuario !== usuario.repassword){
			return res.status(500).json({ message:"Las claves deben ser iguales!"}); //Dos parametros: primero variable, segundo el valor que tendra esa variable
		}

		delete usuario.repassword;
        const busqueda = await userModel.buscarId(usuario.dni_usuario);		
		usuario.pwd_usuario = await userModel.encriptarPassword(usuario.pwd_usuario);
		
        if (!busqueda) {
            const result = await userModel.crear(usuario);
			
			if (!result)
				return res.status(400).json({ message:"No se pudo crear el usuario "});
			else{
				return res.status(200).json({ message:"Usuario Registrado "});
			}
        }
		return res.status(500).json({ message:"El usuario y/o email ya se encuentra registrado!"});			
	}

	public async update(req:Request,res:Response){		
        const { id } = req.params;		
		const result = await userModel.buscarId(id);		
		console.log(result);
		
		if(result)
		{
			const usuario = req.body;
			if(usuario.NPass){
				if(usuario.NPass.replace(' ','') === ''){
					delete usuario.NPass;
					delete usuario.Password;			
				} else{
					usuario.pwd_usuario = await userModel.encriptarPassword(usuario.NPass);
					delete usuario.NPass;
				}
			} else {
				delete usuario.pwd_usuario;
			}			

			if(usuario.dni_usuario === "" || usuario.nombre_usuario === "" || usuario.apellido_usuario === "" || usuario.organismo === "" || usuario.pcia_usuario === "" || usuario.perfil_usuario === ""){
				return res.status(400).json({ message:"Debe completar todos los datos!"});
			}		
			else{		
				const result = await userModel.actualizar(usuario, id);			
				if(result) {			
					return res.status(200).json({ message:"Usuario actualizado correctamente"});
				}
				return res.status(400).json({ message:"Error al actualizar los datos!"});
			}
		}
		return res.status(400).json({ message:"El usuario no se encuentra registrado"});
	}

	public async delete(req:Request,res:Response){        
		const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
		console.log(id);
        const result = await userModel.eliminar(id);				
		return res.status(200).json({ message:"Se eliminó el usuario correctamente!"});
	}
	//FIN CRUD

	//METODO PARA CERRAR LA SESION
	public endSession(req: Request, res: Response){        
        req.session.user={}; //Se borran los datos del usuarios guardados en la variable user
        req.session.auth=false; //Se pone autenticado en false
        req.session.destroy(()=>console.log("Sesion finalizada")); //Metodo para destruir datos asociados a la sesion
        res.redirect("/");
    }
}

const userController = new UserController(); 
export default userController;