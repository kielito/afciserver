import { Router, Request, Response } from 'express';
import { TokenValidation } from "../lib/verifyToken";
import proveedorController from '../controller/proveedorController'; //ruta relativa

class ProveedorRoutes{
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

		this.router.get('/listar',TokenValidation,proveedorController.listar);		
		this.router.post('/agregar',TokenValidation,proveedorController.agregar);		
		this.router.post('/editar',TokenValidation,proveedorController.update); 		
        this.router.delete('/eliminar/:id',TokenValidation,proveedorController.delete);
    }	
}

const proveedorRoutes = new ProveedorRoutes();
export default proveedorRoutes.router;