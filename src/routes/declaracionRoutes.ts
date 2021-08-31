import { Router, Request, Response } from 'express';
import {TokenValidation} from "../lib/verifyToken";
import declaracionController from '../controller/declaracionController';
import { validateRequestSchema } from '../lib/validation'; // para validar
import { registerSchema } from '../lib/register-schema'; // para validar

class DeclaracionRoutes{
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
           
        //CRUD
        
		this.router.post('/add',TokenValidation,declaracionController.altaDecJuradaIndividual);
        
        //Fin CRUD
        //CIERRE DE SESION
        this.router.get('/salir',TokenValidation,declaracionController.endSession);        
    }	
}
//Exportamos el enrutador con 
const declaracionRoutes = new DeclaracionRoutes();
export default declaracionRoutes.router;