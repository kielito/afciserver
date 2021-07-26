import {Request, Response} from 'express';
import  userModel from '../models/userModel';
import jwt from "jsonwebtoken";

class UserController{
	public signin(req:Request,res:Response){		
        res.render("partials/signinForm");
	}	

    public async login(req:Request,res:Response){
		var { Usuario, Email, Password } = req.body;
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
				const token:string=jwt.sign({_id: result.id, _rol: result.rol},"secretKey", {
					expiresIn: '1d'
				}); //Genera el Token del Usuario
				
				return res.status(200).json({ message:"Bienvenido "+result.nombre, sesion,token:token });
				
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
		if(usuario.nombre.length < 2){
			return res.status(500).json({ message:"El Usuario no cumple con las reglas!"}); //Dos parametros: primero variable, segundo el valor que tendra esa variable
		}	

		if(usuario.password.length < 5){
			return res.status(500).json({ message:"La clave no cumple con las reglas!"}); //Dos parametros: primero variable, segundo el valor que tendra esa variable
		}

		if(usuario.password !== usuario.repassword){
			return res.status(500).json({ message:"Las claves deben ser iguales!"}); //Dos parametros: primero variable, segundo el valor que tendra esa variable
		}

		delete usuario.repassword;
        const busqueda = await userModel.buscarUsuario(usuario.usuario, usuario.email);		
		usuario.password = await userModel.encriptarPassword(usuario.password);

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
		
		if(result)
		{
			const usuario = req.body;
			if(usuario.NPass){
				if(usuario.NPass.replace(' ','') === ''){
					delete usuario.NPass;
					delete usuario.Password;			
				} else{
					usuario.Password = await userModel.encriptarPassword(usuario.NPass);
					delete usuario.NPass;
				}
			} else {
				delete usuario.Password;
			}			

			if(usuario.Usuario === "" || usuario.Nombre === "" || usuario.Apellido === "" || usuario.Email === "" || usuario.Id === "" || usuario.Perfil === ""){
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