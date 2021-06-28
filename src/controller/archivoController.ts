import { Request, Response } from 'express';
import  userModel from '../models/userModel';
import path from 'path';
import fs from 'fs-extra';


class ArchivoController{

public async buscarArchivos(req: Request, res: Response) {
    const archivos = await userModel.budcarArchivos();
    
    return res.json(archivos);
}

public async buscarArchivo(req: Request, res: Response) {
    const { id } = req.params;
    
    const archivo = await userModel.budcarArchivo(id);
    
    return res.json(archivo);
}

public async crearArchivo(req: Request, res: Response) {
    //const {titulo, descripcion } = req.body;
    console.log('llega');
    console.log(req.file);
    const nuevoArchivo = {        
        NombreOriginal: req.file?.originalname,
        NuevoNombre: req.file?.filename,
        Path: req.file?.path
    }
    await userModel.crearArchivo(nuevoArchivo);    

    return res.json({
        message: 'Archivo Cargado correctamente'
    })
}

public async eliminarArchivo(req: Request, res: Response) {
    const { id } = req.params; 

    const archivo =  await userModel.budcarArchivo(id);
    await userModel.eliminarArchivo(id);    

    if(archivo) {
        fs.unlink(path.resolve(archivo.Path));
        return res.json({message: 'Archivo borrado', archivo});
    } else 
        return res.json({message: 'No se encontró el Archivo'});
}

}

const archivoController = new ArchivoController(); 
export default archivoController;