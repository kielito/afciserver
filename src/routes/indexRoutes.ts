import { Router, Request, Response } from 'express';
import { createPool } from 'mysql2/promise';

class IndexRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> {            
			req.session.auth=false;
			req.session.user={};
            res.render("partials/principal");
        });

		this.router.get('/test',async (req:Request,res:Response)=>  {
			const db = await createPool({
				host: 'localhost',
				user: 'root',
				password: '',
				database: 'heroku_4505cc56058eb11',
				connectionLimit: 10
			});

			const result=(await db.query("SELECT * FROM usuario"))[0];	
			console.log(result);
			res.send("Test OK!!! Revisar filas en consola del servidor");
        });
    }
}

//Exportamos el enrutador con 

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;