import { Router, Request, Response } from 'express';
import {TokenValidation} from "../lib/verifyToken";
import comentarioController from '../controller/comentarioController'; //ruta relativa
import { crearArchivo, buscarArchivos, buscarArchivo, eliminarArchivo } from '../controller/archivoController';
import multer from '../lib/multer';

class ComentarioRoutes{
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

        //archivos
		this.router.get('/archivos/:id', buscarArchivo);
        this.router.delete('/archivos/:id',eliminarArchivo);
        this.router.get('/archivos', buscarArchivos);
		this.router.post('/archivos', multer.single('image'), crearArchivo);

        //CRUD
        this.router.get('/list',TokenValidation,comentarioController.list);
		this.router.get('/find/:id',TokenValidation,comentarioController.find);
		this.router.post('/add',TokenValidation,comentarioController.add);     
        this.router.post('/update/:id',TokenValidation,comentarioController.update); //almaceno los datos modificados        
        this.router.delete('/delete/:id',TokenValidation,comentarioController.delete);       
        //Fin CRUD     

        //CIERRE DE SESION
        this.router.get('/salir',comentarioController.endSession);
        
    }	
}

//Exportamos el enrutador con 

const comentarioRoutes = new ComentarioRoutes();
export default comentarioRoutes.router;