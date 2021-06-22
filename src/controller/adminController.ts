import {Request, Response} from 'express';
import  adminModel from '../models/adminModel';
import flash from "connect-flash";


class ArticuloController{
	
	//HOME
    public async home(req:Request,res:Response){		
		if(!req.session.auth){
            req.flash('error','Debes iniciar sesion para ver esta seccion!');
			res.redirect("../user/signin");
		}
		else {
			if(req.session.user.rol !== "admin"){
				req.flash('error','Debes tener perfil de Admin para ver esta seccion!');
				res.redirect("../user/home");
			}
			res.render("partials/homeadmin");
		}
	}

	public async listarPedidos(req:Request,res:Response){		
		if(!req.session.auth){
            req.flash('error','Debes iniciar sesion para ver esta seccion!');
			res.redirect("../user/signin");
		}
		else {
			if(req.session.user.rol !== "admin"){
				req.flash('error','Debes tener perfil de Admin para ver esta seccion!');
				res.redirect("../user/home");
			}

			const pedido = await adminModel.listarpedidos();       
        	res.render('partials/pedidos', { pedidos: pedido });
		}
	}

	public async abmProductos(req:Request,res:Response){		
		if(!req.session.auth){
            req.flash('error','Debes iniciar sesion para ver esta seccion!');
			res.redirect("../user/signin");
		}
		else {
			if(req.session.user.rol !== "admin"){
				req.flash('error','Debes tener perfil de Admin para ver esta seccion!');
				res.redirect("../user/home");
			}

			const producto = await adminModel.listarproductos();       
        	res.render('partials/abmproductos', { productos: producto });
		}
	}

	//CRUD	
	public async agregarProductos(req:Request,res:Response){
		const producto = req.body;		

		if(!req.session.auth){
            req.flash('error','Debes iniciar sesion para ver esta seccion!');
			res.redirect("../user/signin");
		}
		else {
			if(req.session.user.rol !== "admin"){
				req.flash('error','Debes tener perfil de Admin para ver esta seccion!');
				res.redirect("../user/home");
			}	

			var texto_limpio = producto.nombre.replace(/^\s+|\s+$/g,"");
			if(texto_limpio === "")
			{
				req.flash('error','El Nombre no puede estar vacío!');
				return res.redirect("./abmproductos");
			}
			const busqueda = await adminModel.buscarProducto(producto.nombre);
	
			if (!busqueda) {				
				const result = await adminModel.crear(producto);
				
				if (!result) 
					req.flash('error','No se pudo crear el producto!');
				req.flash('confirmacion','Producto agregado correctamente!');
				
				return res.redirect("./abmproductos");
			}
			req.flash('error','El Producto ya se encuentra registrado!');
			return res.redirect("./abmproductos");
		}	
	}

	public async update(req:Request,res:Response){
		if(!req.session.auth){
            req.flash('error','Debes iniciar sesion para ver esta seccion!');
			res.redirect("../user/signin");
		}
		else {
			if(req.session.user.rol !== "admin"){
				req.flash('error','Debes tener perfil de Admin para ver esta seccion!');
				res.redirect("../user/home");
			}		
			
			var texto_limpio = req.body.nombre.replace(/^\s+|\s+$/g,"");
			if(texto_limpio === "")
			{
				req.flash('error','El Nombre no puede estar vacío!');
				return res.redirect("./abmproductos");
			}

			const id = req.body.id;
			delete req.body.id;
				
			const result = await adminModel.actualizar(req.body, id);
        
			if(result)		
				req.flash('confirmacion','El producto fue actualizado correctamente!');			
			
			else
				req.flash('error','El producto no se pudo actualizar!');
				
			return res.redirect("./abmproductos");
		}
	}

	public async delete(req:Request,res:Response){
		if(!req.session.auth){
            req.flash('error','Debes iniciar sesion para ver esta seccion!');
			res.redirect("../user/signin");
		}
		else {
			if(req.session.user.rol !== "admin"){
				req.flash('error','Debes tener perfil de Admin para ver esta seccion!');
				res.redirect("../user/home");
			}

			const { id } = req.params;
        	const result = await adminModel.eliminar(id);        
			req.flash('confirmacion','Se eliminó el producto correctamente!');			
			res.redirect('../abmproductos');			
		}
	}

}

const articuloController = new ArticuloController(); 
export default articuloController;