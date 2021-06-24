import {Request, Response} from 'express';
import  proveedorModel from '../models/proveedorModel';

class ProveedorController{
	
	public async listar(req:Request,res:Response){		
        const proveedores = await proveedorModel.listar();        
        return res.json(proveedores);        
	}    
    
    //CRUD
    public async agregar(req:Request,res:Response){
		const proveedor = req.body;
		
        if(proveedor.TipoDocumento === "" || proveedor.NumeroDocumento === "" || proveedor.RazonSocial === "" || proveedor.Email === "" || proveedor.Direccion === "" || proveedor.Localidad === ""|| proveedor.Provincia === ""|| proveedor.CodigoPostal === ""){
            return res.status(400).json({ message:"Debe completar todos los datos!"});
        } else{
            const busqueda = await proveedorModel.buscarNumeroDocumento(proveedor.NumeroDocumento);
        
            if (!busqueda) {				
                const resultado = await proveedorModel.crearProveedor(proveedor);            
                if (!resultado)
                    return res.status(400).json({ message:"No se pudo crear el proveedor!"});
                else{				
                    return res.status(200).json({ message:"Proveedor Registrado correctamente!"});
			    }
            }
            return res.status(500).json({ message:"El Proveedor ya se encuentra registrado!"});	
        }
	}
    
    public async update(req:Request,res:Response){
        const proveedor = req.body;
        const id = proveedor.Id;
        delete proveedor.Id;

        const busqueda = await proveedorModel.buscarProveedor(id);	
        
        if(busqueda)
        {
            if(proveedor.TipoDocumento === "" || proveedor.NumeroDocumento === "" || proveedor.RazonSocial === "" || proveedor.Email === "" || proveedor.Direccion === "" || proveedor.Localidad === ""|| proveedor.Provincia === ""|| proveedor.CodigoPostal === ""){
                return res.status(400).json({ message:"Debe completar todos los datos!"});
            }		
            else{	
                const result = await proveedorModel.actualizarProveedor(proveedor, id);			
                if(result) {			
                    return res.status(200).json({ message:"Proveedor actualizado correctamente"});
                }
                return res.status(400).json({ message:"Error al actualizar los datos!"});
            }
        }
        return res.status(400).json({ message:"El Proveedor no se encuentra registrado"});
	}

	public async delete(req:Request,res:Response){
        const { id } = req.params;
        const result = await proveedorModel.eliminarProveedor(id);
		return res.status(200).json({ message:"Se eliminó el Proveedor correctamente!"});
	}

    //CRUD
}

const proveedorController = new ProveedorController(); 
export default proveedorController;