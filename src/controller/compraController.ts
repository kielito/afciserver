/*******************************************************************************
*		DNI:33.111.151
*		APELLIDO/S: GOMEZ
*		NOMBRE/S: LEANDRO
*		PARCIAL: 2
*		FECHA: 17/06/2021
*******************************************************************************/

import {Request, Response} from 'express';
import  compraModel from '../models/compraModel';


class CompraController{
	
	public async listar(req:Request,res:Response){		
        const compras = await compraModel.listar();
        return res.json(compras);        
	}    
    
    public async crearcompra(req:Request,res:Response){
        var articulos = req.body;

        console.log(articulos);
        var compra_articulo=[];
        let id="";        
        let total=0;

        for (let i=0;i<articulos.length;i++) {
            if(articulos[i].id)
            {
                const precio = await compraModel.listarPrecio(articulos[i].id.toString());            
                total = total + (precio.precio*articulos[i].cantidad);
            }
        }

        for (let i=0;i<articulos.length;i++) {
            if(articulos[i].calle != undefined)
            {
                var compra={"calle": articulos[i].calle,
                "altura": articulos[i].altura,
                "total": total   
                };
                const result = await compraModel.crearCompra(compra);
                id = result.toString();
            }
        }

        for (let i=0;i<articulos.length;i++) {
            if(articulos[i].id)
            {     
                const precio = await compraModel.listarPrecio(articulos[i].id.toString());
                compra_articulo.push({  
                    "id_pedido": id,
                    "id_articulo": articulos[i].id.toString(),
                    "precio": precio.precio.toString(),
                    "cantidad": articulos[i].cantidad                
                });            
                await compraModel.crearCompraArticulo(compra_articulo[i])
            }        
        }
        return res.status(200).json({ message:"Pedido cargado correctamente!"});
    }

    
    public async crearcarrito(req:Request,res:Response){
        /*var articulos = req.body;        
        var compra_articulo=[];
        console.log(id);
		
        for (let i=0;i<articulos.length;i++) {            
            compra_articulo.push({  
                "id_pedido": id,
                "id_articulo": articulos[i].id.toString(),
                "precio": articulos[i].precio.toString(),
                "cantidad": articulos[i].cantidad
            });
            await compraModel.crearCompraArticulo(compra_articulo[i])
        }
       
        return res.status(200).json({ message:"Compra Registrada "});*/
        
    }
}

const compraController = new CompraController(); 
export default compraController;