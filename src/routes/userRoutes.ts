import { Router, Request, Response } from 'express';
import {TokenValidation} from "../lib/verifyToken";
import userController from '../controller/userController';
import { validateRequestSchema } from '../lib/validation';
import { registerSchema } from '../lib/register-schema';

class UserRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
        //se asocian rutas con el metodo de una clase existente:
		this.router.get('/',(req:Request,res:Response)=> {
            req.session.auth=false;
			req.session.user={};            
            res.render("partials/signinForm");
        });        

        //inicio sesion
        this.router.get('/signin',userController.signin); 
        this.router.post('/signin',userController.login);        
		this.router.post('/signup',TokenValidation,registerSchema, validateRequestSchema, userController.addUser);        
        //CRUD
        this.router.get('/list',TokenValidation,userController.list);
		this.router.get('/find/:id',TokenValidation,userController.find);
		this.router.post('/add',TokenValidation,userController.addUser);
        this.router.post('/update/:id',TokenValidation,userController.update); //almaceno los datos modificados
        this.router.delete('/delete/:id',TokenValidation,userController.delete);     
        //Fin CRUD
        //CIERRE DE SESION
        this.router.get('/salir',TokenValidation,userController.endSession);        
    }	
}
//Exportamos el enrutador con 
const userRoutes = new UserRoutes();
export default userRoutes.router;