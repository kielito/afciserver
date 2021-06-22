import { Router, Request, Response } from 'express';
import {TokenValidation} from "../lib/verifyToken";
import adminController from '../controller/adminController'; //ruta relativa

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

        //Home del usuario        
        this.router.get('/home',TokenValidation,adminController.home);
        
        this.router.get('/listarpedidos',TokenValidation,adminController.listarPedidos);        
              
        this.router.get('/abmproductos',TokenValidation,adminController.abmProductos);        

        this.router.post('/agregarproducto',TokenValidation,adminController.agregarProductos);

        this.router.post('/update',TokenValidation,adminController.update);
        
        this.router.get('/delete/:id',TokenValidation,adminController.delete);
    }	
}

const articuloRoutes = new ArticuloRoutes();
export default articuloRoutes.router;