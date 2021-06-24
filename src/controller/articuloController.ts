import {Request, Response} from 'express';
import  articuloModel from '../models/articuloModel';


class ArticuloController{
	
	public async listar(req:Request,res:Response){        
        const articulos = await articuloModel.listar();
        const proveedores = await articuloModel.listarProveedor();       

        return res.json({ articulo:articulos, proveedor: proveedores });
	}    
    
    //CRUD
    public async agregar(req:Request,res:Response){
		const articulo = req.body;
        const id = articulo.Id;
        delete articulo.Id;

        const IdProveedor = await articuloModel.buscarProveedor(articulo.RazonSocial);	
        const busqueda = await articuloModel.buscarId(id);
		
        if(articulo.CodigoProducto === "" || articulo.Descripcion === "" || articulo.RazonSocial === "" || articulo.PrecioVenta === ""){
            return res.status(400).json({ message:"Debe completar todos los datos!"});
        } else{
            const busqueda = await articuloModel.buscarCodigoArticulo(articulo.CodigoProducto);
        
            if (!busqueda) {
                articulo.IdProveedor = IdProveedor.Id;
                delete articulo.RazonSocial;

                console.log(articulo);				
                const resultado = await articuloModel.crear(articulo);            
                if (!resultado)
                    return res.status(400).json({ message:"No se pudo crear el proveedor!"});
                else{				
                    return res.status(200).json({ message:"Articulo Registrado correctamente!"});
			    }
            }
            return res.status(500).json({ message:"El Articulo ya se encuentra registrado!"});	
        }
	}
    
    public async update(req:Request,res:Response){        
		const articulo = req.body;
        const id = articulo.Id;
        delete articulo.Id;

        const IdProveedor = await articuloModel.buscarProveedor(articulo.RazonSocial);	
        const busqueda = await articuloModel.buscarId(id);
        
        if(busqueda && IdProveedor){
            if(articulo.CodigoProducto === "" || articulo.Descripcion === "" || articulo.RazonSocial === "" || articulo.PrecioVenta === ""){
                return res.status(400).json({ message:"Debe completar todos los datos!"});
            }		
            else{
                articulo.IdProveedor = IdProveedor.Id;
                delete articulo.RazonSocial;
                
                const result = await articuloModel.actualizar(articulo, id);			
                if(result) {			
                    return res.status(200).json({ message:"Articulo actualizado correctamente"});
                }
                return res.status(400).json({ message:"Error al actualizar los datos!"});
            }
        }
        return res.status(400).json({ message:"El Articulo no se encuentra registrado"});
	}

	public async delete(req:Request,res:Response){
        const { id } = req.params;
        const result = await articuloModel.eliminar(id);
		return res.status(200).json({ message:"Se eliminó el Artículo correctamente!"});			
	}
    //CRUD
}

const articuloController = new ArticuloController(); 
export default articuloController;