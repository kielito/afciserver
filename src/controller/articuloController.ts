import {Request, Response} from 'express';
import  articuloModel from '../models/articuloModel';


class ArticuloController{
	
	public async listar(req:Request,res:Response){        
        const articulos = await articuloModel.listar();
        return res.json(articulos);	
	}    
    
    //CRUD
    public async agregarProductos(req:Request,res:Response){
		const articulo = req.body;
        let idProducto;

		var texto_limpio = articulo.nombre.replace(/^\s+|\s+$/g,"");
		
        if(texto_limpio === "")
		{
            return res.status(500).json({ message:"El Nombre no puede estar vacío! "});
		}
		const busqueda = await articuloModel.buscarCodigoProducto(articulo.CodigoProducto);
	
		if (!busqueda) {				
			idProducto = await articuloModel.crear(articulo.CodigoProducto, articulo.Descripcion);
        }
        else {
            const resultBuscarProdProv = await articuloModel.buscarProductoProveedor(busqueda.Id, articulo.IdProveedor);
            if (resultBuscarProdProv)
                return res.status(500).json({ message:"El Producto ya se encuentra registrado para este proveedor!"});
        }

        const result = await articuloModel.crearProductoProveedor(idProducto, articulo.IdProveedor, articulo.StockMinimo, articulo.StockActual, articulo.PrecioVenta);
        				
		if (!result) 
            return res.status(500).json({ message:"No se pudo crear el producto! "});					
        return res.status(200).json({ message:"Producto agregado correctamente! "});        
	}
    
    public async update(req:Request,res:Response){        
		var texto_limpio = req.body.nombre.replace(/^\s+|\s+$/g,"");
		if(texto_limpio === "")
		{
			return res.status(500).json({ message:"El Nombre no puede estar vacío! "});
		}

		const id = req.body.id;
		delete req.body.id;
				
		const result = await articuloModel.actualizar(req.body, id);
        
		if(result)
            return res.status(200).json({ message:"El producto fue actualizado correctamente! "});
		else
            return res.status(500).json({ message:"El producto no se pudo actualizar!"});
	}

	public async delete(req:Request,res:Response){
        const articulo = req.body;
        console.log(req.body);
        
        await articuloModel.eliminarProductoProveedor(articulo.id);
        //await articuloModel.eliminar(articulo.id);
			
        return res.status(200).json({ message:"Se eliminó el producto correctamente!"});			
	}
    //CRUD
}

const articuloController = new ArticuloController(); 
export default articuloController;