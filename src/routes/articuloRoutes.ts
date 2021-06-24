import { Router, Request, Response } from 'express';
import {TokenValidation} from "../lib/verifyToken";
import articuloController from '../controller/articuloController'; //ruta relativa

class ArticuloRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{

		this.router.get('/',(req:Request,res:Response)=> {
            req.session.auth=false;
			req.session.user={};
            res.render("partials/signinForm");
        });   
              
        this.router.get('/listar',TokenValidation,articuloController.listar);		
		this.router.post('/agregarproducto',TokenValidation,articuloController.agregar);
		this.router.post('/editar',TokenValidation,articuloController.update);        
        this.router.delete('/eliminar/:id',TokenValidation,articuloController.delete);

    }	
}

const articuloRoutes = new ArticuloRoutes();
export default articuloRoutes.router;