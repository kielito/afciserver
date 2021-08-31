import {Request, Response} from 'express';
import  declaracionModel from '../models/declaracionModel';
import jwt from "jsonwebtoken";

class DeclaracionController{
	public async altaDecJuradaIndividual(req:Request,res:Response){
		const declaracionIndividual = req.body;

        // dec_jurada
            if(declaracionIndividual.selloAFCI != "" && declaracionIndividual.selloPAFCI != "")
            {
                declaracionIndividual.sellos_pedidos = 4;
            }
            else if (declaracionIndividual.selloAFCI != "" && declaracionIndividual.selloPAFCI == "")
            {
                declaracionIndividual.sellos_pedidos = 1;
            }
            else if (declaracionIndividual.selloAFCI == "" && declaracionIndividual.selloPAFCI != "")
            {
                declaracionIndividual.sellos_pedidos = 3;
            }
            /*
            console.log(declaracionIndividual.dni_usuario);
            console.log(declaracionIndividual.pcia_usuario);        
            console.log(declaracionIndividual.sellos_pedidos);
            console.log(declaracionIndividual.fecha_alta);
            console.log(declaracionIndividual.fecha_firma_ddjj);
            console.log(declaracionIndividual.tipo_dec_jurada);
            */               
            const resultAltaDecJurada = await declaracionModel.altaDecJurada(declaracionIndividual.fecha_alta, declaracionIndividual.sellos_pedidos, declaracionIndividual.fecha_firma_ddjj, declaracionIndividual.tipo_dec_jurada, declaracionIndividual.pcia_usuario, declaracionIndividual.dni_usuario);
            /*
            console.log(resultAltaDecJurada);
            if (!resultAltaDecJurada)
                return res.status(400).json({ message:"No se pudo crear la dec_jurada "});
            else{
                return res.status(200).json({ message:"dec_jurada creada "});
            }
            */

        // solicitante
            if(declaracionIndividual.tel_movil_solicitante != "" && declaracionIndividual.tel_solicitante != "")
            {
                declaracionIndividual.tel_solicitante = declaracionIndividual.tel_movil_solicitante+""+declaracionIndividual.tel_solicitante;
            }        
            console.log(declaracionIndividual.tel_solicitante);
        
            const resultAltaSolicitante = await declaracionModel.altaSolicitante(declaracionIndividual.dni_solicitante, resultAltaDecJurada, declaracionIndividual.nombre_solicitante, declaracionIndividual.apellido_solicitante, declaracionIndividual.nacionalidad_solicitante, declaracionIndividual.cuit_solicitante, declaracionIndividual.renaf_solicitante, declaracionIndividual.nacimiento_solicitante, declaracionIndividual.direccion_solicitante, declaracionIndividual.localidad_solicitante, declaracionIndividual.provincia_solicitante, declaracionIndividual.tel_solicitante, declaracionIndividual.email_solicitante, declaracionIndividual.latitud_solicitante, declaracionIndividual.longitud_solicitante, declaracionIndividual.codigo_postal_solicitante, declaracionIndividual.tipo_dec_jurada);
            /*
            console.log(resultAltaSolicitante);
            if (!resultAltaSolicitante)
                return res.status(400).json({ message:"No se pudo crear la dec_jurada "});
            else{
                return res.status(200).json({ message:"dec_jurada creada "});
            }
            */

        // produccion
            if(declaracionIndividual.decide_produccion)
            {
                declaracionIndividual.decide_produccion = "Si";
            }
            else
            {
                declaracionIndividual.decide_produccion = "No";
            }

            if(declaracionIndividual.decide_comercializacion)
            {
                declaracionIndividual.decide_comercializacion = "Si";
            }
            else
            {
                declaracionIndividual.decide_comercializacion = "No";
            }

            if(declaracionIndividual.administra_recursos)
            {
                declaracionIndividual.administra_recursos = "Si";
            }
            else
            {
                declaracionIndividual.administra_recursos = "No";
            }

            if(declaracionIndividual.tipo_vegetal == "1")
            {
                declaracionIndividual.tipo_vegetal = "Invierno";
            }
            else if(declaracionIndividual.tipo_vegetal == "2")
            {
                declaracionIndividual.tipo_vegetal = "Primavera";
            }
            else if(declaracionIndividual.tipo_vegetal == "3")
            {
                declaracionIndividual.tipo_vegetal = "Verano";
            }
            else if(declaracionIndividual.tipo_vegetal == "4")
            {
                declaracionIndividual.tipo_vegetal = "Otoño";
            }

            if(declaracionIndividual.tipo_animal == "1")
            {
                declaracionIndividual.tipo_animal = "Invierno";
            }
            else if(declaracionIndividual.tipo_animal == "2")
            {
                declaracionIndividual.tipo_animal = "Primavera";
            }
            else if(declaracionIndividual.tipo_animal == "3")
            {
                declaracionIndividual.tipo_animal = "Verano";
            }
            else if(declaracionIndividual.tipo_animal == "4")
            {
                declaracionIndividual.tipo_animal = "Otoño";
            }
            /*
            console.log(declaracionIndividual.decide_produccion);
            console.log(declaracionIndividual.decide_comercializacion);
            console.log(declaracionIndividual.administra_recursos);
            console.log(declaracionIndividual.tipo_vegetal);
            console.log(declaracionIndividual.tipo_animal);
            console.log(declaracionIndividual.describe_principal);
            */
            const resultAltaProduccion = await declaracionModel.altaProduccion(resultAltaDecJurada, declaracionIndividual.decide_produccion, declaracionIndividual.decide_comercializacion, declaracionIndividual.administra_recursos, declaracionIndividual.tipo_vegetal, declaracionIndividual.tipo_animal, declaracionIndividual.describe_principal, declaracionIndividual.tipo_dec_jurada);
        
        // puntos_venta
            const resultAltaPuntoVenta = await declaracionModel.altaPuntoVenta(resultAltaDecJurada, declaracionIndividual.descripcion_pv, declaracionIndividual.direccion_pv, declaracionIndividual.localidad_pv, declaracionIndividual.latitud_pv, declaracionIndividual.longitud_pv, declaracionIndividual.tipo_dec_jurada);



    }	

	//METODO PARA CERRAR LA SESION
	public endSession(req: Request, res: Response){        
        req.session.user={}; //Se borran los datos del usuarios guardados en la variable user
        req.session.auth=false; //Se pone autenticado en false
        req.session.destroy(()=>console.log("Sesion finalizada")); //Metodo para destruir datos asociados a la sesion
        res.redirect("/");
    }
}

const declaracionController = new DeclaracionController(); 
export default declaracionController;