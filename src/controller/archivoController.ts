import { Request, Response } from 'express';

export function leerArchivo(req: Request, res: Response) {

}

export function crearArchivo(req: Request, res: Response) {
    console.log();
    console.log(req.body);

    return res.json({
        message: 'Archivo Cargado correctamente'
    })
}