import { Router, Request, Response } from 'express';
import {TokenValidation} from "../lib/verifyToken";
import userController from '../controller/userController'; //ruta relativa

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
        this.router.post('/signin',userController.login); //Paso 15

        //registro - Paso 18
		this.router.get('/signup',TokenValidation,userController.signup);
		this.router.post('/signup',TokenValidation,userController.addUser);

        
        //Home del usuario        
        this.router.get('/home',TokenValidation,userController.home);
        this.router.post('/home',TokenValidation,userController.home);


        //CRUD
        this.router.get('/list',TokenValidation,userController.list);
		this.router.get('/find/:id',TokenValidation,userController.find);
		this.router.post('/add',TokenValidation,userController.addUser);

        this.router.get('/update/:id',TokenValidation,userController.procesar); //dibujo la vista		
        this.router.post('/update/:id',TokenValidation,userController.update); //almaceno los datos modificados
        //this.router.put('/update/:id',userController.procesar);
		

        this.router.delete('/delete/:id',TokenValidation,userController.delete);
        //this.router.get('/delete/:id',TokenValidation,userController.delete);
        //Fin CRUD

        this.router.get('/activate/:id',userController.activar);
        
        //CONTROL
        this.router.get('/control',TokenValidation,userController.control);        
        //this.router.get('/procesar/id',userController.procesar);
        //this.router.post('/procesar/:id',userController.procesar);        

        //CIERRE DE SESION
        this.router.get('/salir',TokenValidation,userController.endSession);
        
    }	
}

//Exportamos el enrutador con 

const userRoutes = new UserRoutes();
export default userRoutes.router;