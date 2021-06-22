/*******************************************************************************
*		DNI:33.111.151
*		APELLIDO/S: GOMEZ
*		NOMBRE/S: LEANDRO
*		PARCIAL: 2
*		FECHA: 17/06/2021
*******************************************************************************/

import { Router, Request, Response } from 'express';
import {TokenValidation} from "../lib/verifyToken";
import compraController from '../controller/compraController'; //ruta relativa

class CompraRoutes{
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
              
        this.router.get('/carrito',TokenValidation,compraController.listar);
        //this.router.post('/carrito',compraController.listar);    
		
		//this.router.get('/compra',compraController.crearcompra);
		this.router.post('/compra',TokenValidation,compraController.crearcompra);
		this.router.post('/carrito',TokenValidation,compraController.crearcarrito);
    }	
}

const compraRoutes = new CompraRoutes();
export default compraRoutes.router;